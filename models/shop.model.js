const db = require('./db-conn')

function getProducts () {
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

function getProductById (productID) {
  const sql = `
    SELECT *
    FROM products
    WHERE product_id = ?;
  `
  return db.get(sql, productID)
}

function createNewCart (userID) {
  const sql = `
    INSERT INTO carts(user_id, cart_status)
    VALUES(?, 'new');
  `
  return db.run(sql, userID)
}

function getCartId (userId) {
  const sql = `
    SELECT cart_id
    FROM carts
    WHERE cart_status = 'new' AND user_id = ?;
  `
  const data = db.get(sql, userId)
  return data ? data.cart_id : createNewCart(userId)
}

function getCartProducts (cartID) {
  const sql = `
    SELECT p.product_id, p.product_name, p.product_description, p.product_image_url, p.product_price, cp.cart_product_quantity
    FROM cart_products cp
    JOIN products p ON cp.product_id = p.product_id
    WHERE cp.cart_id = ?;
  `
  return db.all(sql, cartID)
}

function getCartTotal (cartId) {
  const sql = 'SELECT cart_total FROM carts WHERE cart_id = ?'
  return db.get(sql, cartId)
}
function sendToCart (cartID, productID) {
  if (checkIfExists(cartID, productID)) {
    return addQuantity(cartID, productID)
  }
  const sql = `
    INSERT INTO cart_products (cart_id, product_id, cart_product_quantity)
    VALUES(?,?,?);
  `
  return db.runParams(sql, cartID, Number(productID), 1)
}

function addQuantity (cart_id, product_id) {
  const sql = `
    UPDATE cart_products
    SET cart_product_quantity = cart_product_quantity + 1
    WHERE cart_id = ? AND product_id = ?;
  `
  return db.runParams(sql, cart_id, product_id)
}

function minusQuantity (cart_id, product_id) {
  const sql = `
    UPDATE cart_products
    SET cart_product_quantity = cart_product_quantity - 1
    WHERE cart_id = ? AND product_id = ?;
  `
  return db.runParams(sql, cart_id, product_id)
}

function checkIfExists (cartID, productID) {
  const product_id = Number(productID)
  const sql = `
    SELECT product_id
    FROM cart_products
    WHERE cart_id = ?;
  `
  const data = db.all(sql, cartID)
  if (!data || data.length === 0) return false
  return data.some(element => element.product_id === product_id)
}

function deleteProduct (cartID, productID) {
  if (checkIfExists(cartID, productID)) {
    const sql = `
      DELETE from cart_products
      WHERE cart_id =? AND product_id =?;
    `
    return db.runParams(sql, cartID, productID)
  } else {
    console.log(
      'Failed to delete product with id = ',
      productID,
      ' where cart id = ',
      cartID,
      ' Product or cart does not exit.'
    )
    throw new Error('Error deleting product')
  }
}

module.exports = {
  getProducts,
  getCartId,
  getCartProducts,
  sendToCart,
  createNewCart,
  getCartTotal,
  addQuantity,
  minusQuantity,
  deleteProduct
}
