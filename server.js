"use strict";
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const shopRoutes = require("./routes/shop.route");
const { db_close } = require("./models/db-conn");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// Authentication setup
require("./auth/passport");
app.use(
  session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", require("./auth/auth.route"));

// Views setup
app.set("view engine", "pug");
app.set("views", __dirname + "/views");

// Routes
app.use("/MysteriousArtifacts", shopRoutes);

// Home Page redirect
app.get("/", (req, res) => {
  res.redirect("/MysteriousArtifacts/shop");
});

// Start the server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log("App listening at http://localhost:" + PORT);
});

// Handle termination signals
process.on("SIGINT", cleanUp);
function cleanUp() {
  console.log("Terminate signal received.");
  db_close();
  console.log("...Closing HTTP server.");
  server.close(() => {
    console.log("...HTTP server closed.");
  });
}

module.exports = { app };
