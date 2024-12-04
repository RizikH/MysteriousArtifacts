'use strict'
const express = require('express')
const router = express.Router()

const shopController = require('../controllers/shop.controller')

//http://localhost:3000/MysteriousArtifacts/shop
router.get('/shop', shopController.redirectHome)

//http://localhost:3000/MysteriousArtifacts/products
router.get('/products', shopController.redirectProducts)

//http://localhost:3000/MysteriousArtifacts/cart
router.get('/cart', ensureAuth, shopController.redirectCart)

//http://localhost:3000/MysteriousArtifacts/cart/add
router.post('/add', ensureAuth, shopController.sendToCart)

//http://localhost:3000/MysteriousArtifacts/cart/remove
router.post('/remove', shopController.deleteFromCart)

router.post('/cart/update', shopController.updateCart)

router.post('/cart/checkout', shopController.checkout)

function ensureAuth (req, res, next) {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl
    return res.redirect('/auth/login')
  }
  next()
}

module.exports = router
