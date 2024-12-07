"use strict";
const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop.controller");
const adminController = require("../controllers/admin.controller");
const upload = require("../middlewares/upload");

function ensureAuth(req, res, next) {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    return res.redirect("/auth/login");
  }
  next();
}

// Shop routes
router.get("/shop", shopController.redirectHome);
router.get("/products", shopController.redirectProducts);
router.get("/cart", ensureAuth, shopController.redirectCart);
router.post("/add", ensureAuth, shopController.sendToCart);
router.post("/remove", ensureAuth, shopController.deleteFromCart);
router.post("/cart/update", ensureAuth, shopController.updateCart);
router.post("/cart/checkout", ensureAuth, shopController.checkout);

// Admin product routes
router.get("/admin/products", adminController.redirectProducts);
router.post("/admin/products/add", ensureAuth, adminController.addProduct);
router.post("/admin/delete", ensureAuth, adminController.deleteProduct);
router.post("/admin/edit", ensureAuth, adminController.editProduct);

router.get("/admin/upload", adminController.redirectUpload);


// Handle file upload using multer
router.post(
  "/admin/uploadSubmit",
  ensureAuth,
  upload.single("file"),
  adminController.upload
);


module.exports = router;
