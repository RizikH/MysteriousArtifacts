'use strict'
const model = require('../models/shop.model')

function redirectHome (req, res) {
  res.render('index', { title: 'Home - Mysterious Artifacts', user: req.user })
}

function redirectProducts (req, res) {
  const products = model.getProducts()
  res.render('products', {
    products,
    title: 'Products - Mysterious Artifacts',
    user: req.user
  })
}

function sendToCart (req, res) {
  try {
    const cartID = model.getCartId(req.user.id)
    model.sendToCart(cartID, req.body.product_id)
    res.redirect('/MysteriousArtifacts/cart')
  } catch (error) {
    console.error('Error in sendToCart:', error)
    res.status(500).send('Internal Server Error')
  }
}

function redirectCart (req, res) {
  try {
    const cart_id = model.getCartId(req.user.id)
    const cartProducts = model.getCartProducts(cart_id)
    const subTotal = model.getCartTotal(cart_id).cart_total
    console.log('subTotal', subTotal)
    res.render('cart', {
      cartProducts,
      title: 'Cart - Mysterious Artifacts',
      user: req.user,
      subTotal: subTotal
    })
  } catch (error) {
    console.error('Error in redirectCart:', error)
    res.status(500).send('Internal Server Error')
  }
}

function deleteFromCart (req, res) {
  try {
    const cartID = model.getCartId(req.user.id)
    model.deleteProduct(cartID, req.body.productID)
  } catch (error) {
    console.log('Error deleting product:', error)
  }
  res.redirect('/MysteriousArtifacts/cart')
}

module.exports = {
  redirectHome,
  redirectProducts,
  redirectCart,
  sendToCart,
  deleteFromCart
}
