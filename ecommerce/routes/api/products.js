const express = require('express');
const router = express.Router();
const productMock = require('../../utils/mocks/products');

router.get('/', function(req, res, next) {
    const { query } = req.query;

    res.status(200).json({
        data: productMock,
        message: 'products lised',
    });
});

router.get('/:productId', function(req, res, next) {
    const { productId } = req.params;

    res.status(200).json({
        data: productMock[0],
        message: 'product listed',
    });
});

router.post('/', function(req, res, next) {
    const { body: data } = req;
    res.status(201).json({
        data: productMock[0],
        message: 'product created',
    });
});

router.put('/:productId', function(req, res, next) {
    const { body: data } = req;
    const { productId } = req.params;

    res.status(200).json({
        data: productId,
        message: 'product updated',
    });
});

router.delete('/:productId', function(req, res, next) {
    const { productId } = req.params;

    res.status(200).json({
        data: productId,
        message: 'Product deleted',
    });
});

module.exports = router;