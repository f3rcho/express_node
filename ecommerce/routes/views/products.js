const express = require('express');
const slash = require('express-slash');
const app = express();
const router = express.Router({
    caseSensitive: app.get('case sensitive routing'),
    strict: app.get('strict routing'),
});
const ProductsService = require('../../services/products');
const { config } = require('../../config/config');
const productsService = new ProductsService();

const cacheResponse = require('../../utils/cacheResponse');
const { FIVE_MINUTES_IN_SECONDS } = require('../../utils/time');

app.use(router);
app.use(slash());

router.get('/', async function(req, res, next) {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
    const { tags } = req.query;
    try {
        const products = await productsService.getProducts({ tags });
        res.render('products', { products, dev: config.dev });
    } catch (error) {
        next(error);
    };

});

module.exports = router;

// https://cdn.shopify.com/s/files/1/0687/7043/products/image_7a099a84-baa2-4389-a0f3-98a26f18be50_1616x1080.jpg?v=1570156395