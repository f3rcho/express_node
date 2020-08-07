const express = require('express');
const router = express.Router();

const products = [
    {
        name: 'PRS Guitar: Black Cherry',
        price: 900,
        // image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0e44599932dce6b8440e26fb91e10a69&auto=format&fit=crop&w=800&q=60'
        image: 'https://www.promusictools.com/media/catalog/product/cache/1/image/1352x901/bd5be3e4bffe87df985139cc5e5c836c/p/r/prs-se-custom-24-black-cherry-qt-rw-birds-10.jpg'
    },
    {
        name: 'PRS Guitar: Sunburst',
        price: 2000,
        // image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=53d820e6622fadd53b8638d60f468ccd&auto=format&fit=crop&w=800&q=60'
        image: 'https://cdn.shopify.com/s/files/1/0687/7043/products/image_6063dd15-2fbf-455a-83fe-690cea6c0fb7_1616x1080.jpg?v=1570181003'
    },
];

router.get('/', function(req, res, next) {
    res.render('products', { products });
});

module.exports = router;

// https://cdn.shopify.com/s/files/1/0687/7043/products/image_7a099a84-baa2-4389-a0f3-98a26f18be50_1616x1080.jpg?v=1570156395