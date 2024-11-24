const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get(
    "/google",
    passport.authenticate("google", {
        keepSessionInfo: true,
        scope: [
            "https://www.googleapis.com/auth/plus.login",
            "https://www.googleapis.com/auth/userinfo.email",
        ],
    })
);

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }), 
    (req, res) => {
      const redirectTo = req.session.returnTo || '/MysteriousArtifacts/shop';
      delete req.session.returnTo;
      res.redirect(redirectTo);
    }
  );
  
  


router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/logout", function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/MysteriousArtifacts/shop");
    });
});

module.exports = router;