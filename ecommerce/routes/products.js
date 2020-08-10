const express = require('express');
const router = express.Router();
const ProductsService = require('../services/products');

const productsService = new ProductsService();

router.get('/', async function(req, res, next) {
    const { tags } = req.query;
    try {
        const products = await productsService.getProducts({ tags });
        res.render('products', { products });
    } catch (error) {
        next(error);
    };

});

module.exports = router;

// https://cdn.shopify.com/s/files/1/0687/7043/products/image_7a099a84-baa2-4389-a0f3-98a26f18be50_1616x1080.jpg?v=1570156395