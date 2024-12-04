const db = require('./db-conn')

// Get all products
function getProducts() {
    const sql = `
    SELECT 
      product_id AS id, 
      product_name AS name, 
      product_description AS description, 
      product_image_url AS imageUrl, 
      product_price AS price 
    FROM products;
  `
    return db.all(sql)
}

// Get a cart for a user or create a new one if it doesn't exist
function getCart(userId) {
    const sql = `
    SELECT *
    FROM carts
    WHERE cart_status = 'new' AND user_id = ?;
  `
    const cart = db.get(sql, userId)
    return cart ? cart : createNewCart(userId)
}

// Get cart by cart id
function getCartById(cartId) {
    const sql = `
    SELECT *
    FROM carts
    WHERE cart_id = ?;
    `;

    return db.get(sql, cartId)
}

// Create a new cart
function createNewCart(userId) {
    const sql = `
    INSERT INTO carts(user_id, cart_status)
    VALUES(?, 'new');
  `
    db.run(sql, userId)
    return getCart(userId) // Return the newly created cart ID
}

// Get details of a specific product by its ID
function getProductById(productId) {
    const sql = `
    SELECT *
    FROM products
    WHERE product_id = ?;
  `
    return db.get(sql, productId)
}

// Get all products in a cart
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
  `
    return db.all(sql, cartId)
}

// Check if a product exists in a cart
function checkIfExists(cartId, productId) {
    const sql = `
    SELECT product_id
    FROM cart_products
    WHERE cart_id = ? AND product_id = ?;
  `
    const product = db.get(sql, cartId, productId)
    return !!product // Returns true if the product exists, false otherwise
}

// Add a product to a cart
function sendToCart(cartId, productId) {
    if (checkIfExists(cartId, productId)) {
        return updateQuantity(cartId, productId, 1) // Increment quantity if the product already exists
    }
    const sql = `
    INSERT INTO cart_products (cart_id, product_id, cart_product_quantity)
    VALUES (?, ?, 1);
  `
    return db.runParams(sql, cartId, productId)
}

// Increment or decrement product quantity in a cart
function updateQuantity(cartId, productId, change) {
    const sql = `
    UPDATE cart_products
    SET cart_product_quantity = cart_product_quantity + ?
    WHERE cart_id = ? AND product_id = ?;
  `
    return db.runParams(sql, change, cartId, productId)
}

// Decrease quantity of a product in a cart
function minusQuantity(cartId, productId) {
    return updateQuantity(cartId, productId, -1)
}

// Increase quanitity of a product in a cart
function plusQuantity(cartId, productId) {
    return updateQuantity(cartId, productId, 1)
}

// Delete a product from a cart
function deleteProduct(cartId, productId) {
    if (!checkIfExists(cartId, productId)) {
        console.error(
            `Failed to delete: Product with ID = ${productId} not found in cart ID = ${cartId}.`
        )
        throw new Error('Error deleting product')
    }
    const sql = `
    DELETE FROM cart_products
    WHERE cart_id = ? AND product_id = ?;
  `
    return db.runParams(sql, cartId, productId)
}

function createOrder(cartId, orderTotal){
    const orderStatus = 'new'
    const sql = `
    INSERT INTO orders(cart_id, order_total, order_status)
    VALUES(?, ?, ?);
    `;
    
    return db.runParams(sql, cartId, orderTotal, orderStatus);
}

function checkout(cartId) { 
    let sql = `
    UPDATE carts
    SET cart_status = 'purchased'
    WHERE cart_id = ?;
    `;

    db.run(sql, cartId);
}

function getOrder(orderId){
    const sql = `
    SELECT *
    FROM orders
    WHERE order_id = ?;`;

    return db.run(sql, orderId);
};
module.exports = {
    getProducts,
    getCart,
    getCartById,
    getCartProducts,
    sendToCart,
    createNewCart,
    minusQuantity,
    plusQuantity,
    deleteProduct,
    getProductById,
    createOrder,
    checkout,
    getOrder
}
