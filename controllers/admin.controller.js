'use strict';

const shopModel = require('../models/shop.model');
const userModel = require('../models/users.model');
const adminModel = require('../models/admin.model');
const fs = require('fs');
const path = require('path');

// Product Management Functions
function redirectProducts(req, res) {
    const products = shopModel.getProducts();
    const user = req.user;

    res.render('admin/products', {
        products,
        title: 'Admin - Products',
        user
    });
}

function addProduct(req, res) {
    const params = {
        category_id: parseInt(req.body.category_id),
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        product_image_url: req.body.product_image_url,
        product_price: parseFloat(req.body.product_price)
    };

    const created = adminModel.addProduct(params);
    if (!created) {
        alert("Something went wrong. Please try again.");
    }
    res.redirect("/MysteriousArtifacts/admin/products");
}

function deleteProduct(req, res) {
    const id = req.body.id;

    adminModel.removeProduct(id);
    res.redirect("/MysteriousArtifacts/admin/products");
}

function editProduct(req, res) {
    const params = {
        id: parseInt(req.body.id),
        name: req.body.name,
        description: req.body.description,
        category_id: parseInt(req.body.category_id),
        imageUrl: req.body.imageUrl,
        price: parseFloat(req.body.price)
    };

    adminModel.editProduct(params);
    res.redirect("/MysteriousArtifacts/admin/products");
}

// Upload Management Functions
function redirectUpload(req, res) {
    const user = userModel.getUserById(req.user.id);
    res.render('admin/upload', {
        title: 'Admin - Upload',
        user
    });
}

function upload(req, res) {
    const file = req.file;

    if (!file) {
        return res.status(400).send("No file uploaded. Please upload a JSON file.");
    }

    const filePath = file.path;

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            fs.unlink(filePath, () => {});
            return res.status(500).send("Error reading the file.");
        }

        try {
            const parsedData = JSON.parse(data);
            const products = parsedData.products || [];
            const result = adminModel.upload(products);

            if (result.success) {
                return res.redirect("/MysteriousArtifacts/admin/products");
            } else {
                res.status(500).send(`Error inserting products: ${result.message}`);
            }
        } catch {
            res.status(400).send("Invalid file format.");
        } finally {
            fs.unlink(filePath, () => {});
        }
    });
}

module.exports = {
    redirectProducts,
    redirectUpload,
    addProduct,
    deleteProduct,
    editProduct,
    upload
};
