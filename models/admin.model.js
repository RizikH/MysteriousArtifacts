const db = require('./db-conn');

// Product Management Functions
function addProduct(params) {
    const sql = `
    INSERT INTO products
        (category_id, 
        product_name, 
        product_description, 
        product_image_url,
        product_price)
    VALUES (?, ?, ?, ?, ?);
    `;

    const paramArray = [
        params.category_id,
        params.product_name,
        params.product_description,
        params.product_image_url,
        params.product_price
    ];

    return db.run(sql, paramArray);
}

function removeProduct(id) {
    const sql = `
    DELETE FROM products
    WHERE product_id = ?;
    `;

    return db.run(sql, id);
}

function editProduct(params) {
    const sql = `
    UPDATE products
    SET product_name = ?, product_description = ?, category_id = ?, product_image_url = ?, product_price = ?
    WHERE product_id = ?;
    `;

    const paramsArray = [
        params.name,
        params.description,
        params.category_id,
        params.imageUrl,
        params.price,
        params.id
    ];

    return db.runParamsExtracted(sql, paramsArray);
}

// Bulk Upload Function
function upload(products) {
    const sql = `
        INSERT INTO products (category_id, product_name, product_description, product_image_url, product_price)
        VALUES (?, ?, ?, ?, ?);
    `;

    db.exec("BEGIN TRANSACTION");

    try {
        products.forEach(product => {
            const {
                category_id,
                product_name,
                product_description,
                product_image_url,
                product_price
            } = product;

            db.runParamsExtracted(sql, [
                category_id,
                product_name,
                product_description || null,
                product_image_url || null,
                product_price
            ]);
        });

        db.exec("COMMIT");
        return { success: true, message: "Products inserted successfully." };
    } catch {
        db.exec("ROLLBACK");
        return { success: false, message: "Error inserting products." };
    }
}

module.exports = {
    addProduct,
    removeProduct,
    editProduct,
    upload
};
