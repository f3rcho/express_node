const express = require('express');
const router = express.Router();
const products = require('../utils/mocks/products');

router.get('/', function(req, res, next) {
    res.render('products', { products });
});

module.exports = router;

// https://cdn.shopify.com/s/files/1/0687/7043/products/image_7a099a84-baa2-4389-a0f3-98a26f18be50_1616x1080.jpg?v=1570156395