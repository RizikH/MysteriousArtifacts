const db = require('./db-conn');

// Product Management
function getProducts() {
	const sql = `
        SELECT 
            product_id AS id, 
            product_name AS name, 
            product_description AS description, 
            product_image_url AS imageUrl, 
            product_price AS price,
            category_id
        FROM products;
    `;
	return db.all(sql);
}

function getProductById(productId) {
	const sql = `
        SELECT *
        FROM products
        WHERE product_id = ?;
    `;
	return db.get(sql, productId);
}

// Cart Management
function getCart(userId) {
	const sql = `
        SELECT *
        FROM carts
        WHERE cart_status = 'new' AND user_id = ?;
    `;
	const cart = db.get(sql, userId);
	return cart ? cart : createNewCart(userId);
}

function getCartById(cartId) {
	const sql = `
        SELECT *
        FROM carts
        WHERE cart_id = ?;
    `;
	return db.get(sql, cartId);
}

function createNewCart(userId) {
	const sql = `
        INSERT INTO carts(user_id, cart_status)
        VALUES(?, 'new');
    `;
	db.run(sql, userId);
	return getCart(userId);
}

function getCartProducts(cartId) {
	const sql = `
        SELECT 
            p.product_id, 
            p.product_name, 
            p.product_description, 
            p.product_image_url, 
            p.product_price, 
            cp.cart_product_quantity
        FROM cart_products cp
        JOIN products p ON cp.product_id = p.product_id
        WHERE cp.cart_id = ?;
    `;
	return db.all(sql, cartId);
}

function sendToCart(cartId, productId) {
	if (checkIfExists(cartId, productId)) {
		return updateQuantity(cartId, productId, 1);
	}
	const sql = `
        INSERT INTO cart_products (cart_id, product_id, cart_product_quantity)
        VALUES (?, ?, 1);
    `;
	return db.runParams(sql, cartId, productId);
}

function minusQuantity(cartId, productId) {
	return updateQuantity(cartId, productId, -1);
}

function plusQuantity(cartId, productId) {
	return updateQuantity(cartId, productId, 1);
}

function deleteProduct(cartId, productId) {
	if (!checkIfExists(cartId, productId)) {
		throw new Error(`Error deleting product: Product ID ${productId} not found in Cart ID ${cartId}`);
	}
	const sql = `
        DELETE FROM cart_products
        WHERE cart_id = ? AND product_id = ?;
    `;
	return db.runParams(sql, cartId, productId);
}

// Quantity Management
function updateQuantity(cartId, productId, change) {
	const sql = `
        UPDATE cart_products
        SET cart_product_quantity = cart_product_quantity + ?
        WHERE cart_id = ? AND product_id = ?;
    `;
	return db.runParams(sql, change, cartId, productId);
}

function checkIfExists(cartId, productId) {
	const sql = `
        SELECT product_id
        FROM cart_products
        WHERE cart_id = ? AND product_id = ?;
    `;
	return !!db.get(sql, cartId, productId);
}

// Order Management
function createOrder(cartId, orderTotal) {
	const sql = `
        INSERT INTO orders(cart_id, order_total, order_status)
        VALUES(?, ?, 'new');
    `;
	return db.runParams(sql, cartId, orderTotal);
}

function checkout(cartId) {
	const sql = `
        UPDATE carts
        SET cart_status = 'purchased'
        WHERE cart_id = ?;
    `;
	db.run(sql, cartId);
}

function getOrder(orderId) {
	const sql = `
        SELECT *
        FROM orders
        WHERE order_id = ?;
    `;
	return db.get(sql, orderId);
}

module.exports = {
	getProducts,
	getProductById,
	getCart,
	getCartById,
	getCartProducts,
	sendToCart,
	createNewCart,
	minusQuantity,
	plusQuantity,
	deleteProduct,
	createOrder,
	checkout,
	getOrder
};
