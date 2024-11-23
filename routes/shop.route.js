"use strict";
const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop.controller");

//http://localhost:3000/MysteriousArtifacts/shop
router.get("/shop", shopController.redirectHome);

//http://localhost:3000/MysteriousArtifacts/products
router.get("/products", shopController.redirectProducts);

//http://localhost:3000/MysteriousArtifacts/cart
router.get("/cart", ensureAuth, shopController.redirectCart);

//http://localhost:3000/MysteriousArtifacts/cart/add
router.post("/add", ensureAuth, shopController.sendToCart);

router.post("/remove", ensureAuth, shopController.deleteFromCart);


function ensureAuth(req, res, next) {
  req.session.returnTo = req.originalUrl;
   if (!req.isAuthenticated()) {
     return res.redirect('/auth/login');
   }  
   next();
 }

module.exports = router;