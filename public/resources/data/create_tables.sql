PRAGMA foreign_keys = ON;

CREATE TABLE users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name VARCHAR(100) NOT NULL,
    user_email VARCHAR(255) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_type VARCHAR(50) NOT NULL CHECK (user_type IN ('admin', 'shopper')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_name VARCHAR(100) NOT NULL
);

CREATE TABLE products (
    product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER,
    product_name VARCHAR(100) NOT NULL,
    product_description TEXT NOT NULL,
    product_image_url TEXT NOT NULL,
    product_price DECIMAL(10, 2) NOT NULL CHECK (product_price > 0),
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE carts (
    cart_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    cart_status VARCHAR(20) NOT NULL CHECK (cart_status IN ('new', 'abandoned', 'purchased')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE cart_products (
    cart_product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    cart_id INTEGER,
    product_id INTEGER,
    cart_product_quantity INTEGER CHECK (cart_product_quantity > 0),
    FOREIGN KEY (cart_id) REFERENCES carts(cart_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE ON UPDATE CASCADE
);
