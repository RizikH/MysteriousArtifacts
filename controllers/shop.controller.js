'use strict';

const shopModel = require('../models/shop.model');
const userModel = require('../models/users.model');

// Home Functions
function redirectHome(req, res) {
	try {
		const user = req.user ? userModel.getUserById(req.user.id) : null;
		res.render('index', {
			title: 'Home - Mysterious Artifacts',
			user
		});
	} catch (error) {
		console.error('Error in redirectHome:', error);
		res.status(500).send('Internal Server Error');
	}
}

// Product Functions
function redirectProducts(req, res) {
	try {
		const user = req.user ? userModel.getUserById(req.user.id) : null;
		const products = shopModel.getProducts();
		res.render('products', {
			products,
			title: 'Products - Mysterious Artifacts',
			user
		});
	} catch (error) {
		console.error('Error in redirectProducts:', error);
		res.status(500).send('Internal Server Error');
	}
}

// Cart Functions
function sendToCart(req, res) {
	try {
		const user = userModel.getUserById(req.user.id);
		const cart = shopModel.getCart(user.user_id);
		shopModel.sendToCart(cart.cart_id, req.body.product_id);
		res.redirect('/MysteriousArtifacts/cart');
	} catch (error) {
		console.error('Error in sendToCart:', error);
		res.status(500).send('Internal Server Error');
	}
}

function redirectCart(req, res) {
	try {
		const user = userModel.getUserById(req.user.id);
		const cart = shopModel.getCart(user.user_id);
		const cartProducts = shopModel.getCartProducts(cart.cart_id);
		res.render('cart', {
			cartProducts,
			title: 'Cart - Mysterious Artifacts',
			user,
			cart
		});
	} catch (error) {
		console.error('Error in redirectCart:', error);
		res.status(500).send('Internal Server Error');
	}
}

function deleteFromCart(req, res) {
	try {
		const user = userModel.getUserById(req.user.id);
		const cart = shopModel.getCart(user.user_id);
		shopModel.deleteProduct(cart.cart_id, req.body.productID);
		res.redirect('/MysteriousArtifacts/cart');
	} catch (error) {
		console.error('Error in deleteFromCart:', error);
		res.status(500).send('Internal Server Error');
	}
}

function updateCart(req, res) {
	const user = userModel.getUserById(req.user.id);
	const cart = shopModel.getCart(user.user_id);
	const productID = req.body.product_id;
	const quantity = req.body.quantity;
	const action = req.body.action;

	if (quantity === '1' && action === 'decrease') {
		shopModel.deleteProduct(cart.cart_id, productID);
	} else if (action === 'decrease') {
		shopModel.minusQuantity(cart.cart_id, productID);
	} else {
		shopModel.plusQuantity(cart.cart_id, productID);
	}

	res.redirect('/MysteriousArtifacts/cart');
}

// Checkout Functions
function checkout(req, res) {
	const cart = shopModel.getCartById(req.body.cartId);
	const user = userModel.getUserById(cart.user_id);

	const orderCreated = shopModel.createOrder(cart.cart_id, cart.cart_total);
	const orderId = orderCreated.lastInsertRowid;

	const order = shopModel.getOrder(orderId);
	shopModel.checkout(cart.cart_id);

	const cartItems = shopModel.getCartProducts(cart.cart_id);

	res.render('checkout', {
		order,
		cartItems,
		cart,
		user
	});
}

module.exports = {
	redirectHome,
	redirectProducts,
	redirectCart,
	sendToCart,
	deleteFromCart,
	updateCart,
	checkout
};
