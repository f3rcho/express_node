const express = require('express');
const passport = require('passport');
const slash = require('express-slash');
const app = express();
const ProductsService = require('../../services/products');
const joi = require('@hapi/joi');

// Validation Handler middleware
const validationHandler = require('../../utils/middleware/validationHandler');

// Validation Schemas
const { productIdSchema,
    createProductSchema,
    updateProductSchema
} = require('../../utils/schema/productsSchema');

// JWT strategy
require('../../utils/auth/strategies/jwt');

const productsService = new ProductsService;



function productsApi(app) {
    const router = express.Router({
        caseSensitive: app.get('case sensitive routing'),
        strict: app.get('strict routing'),
    });
    app.use('/api/products', router);

    app.use(router);
    app.use(slash());

    router.get('/', async function(req, res, next) {
        const { tags } = req.query;
        try {
            const products = await productsService.getProducts({ tags });

            res.status(200).json({
                data: products,
                message: 'products listed',
            });
        } catch (error) {
            next(error);
        };
    });

    router.get('/:productId',
    validationHandler(joi.object({ productId: productIdSchema})),
    async function(req, res, next) {
        const { productId } = req.params;

        try {
            const product = await productsService.getProduct({ productId });

            res.status(200).json({
                data: product,
                message: 'product retrived',
            });
        } catch (error) {
            next(error);
        };
    });

    router.post('/',
    passport.authenticate('jwt', { session: false }),
    validationHandler(createProductSchema),
    async function(req, res, next) {
        const { body: product } = req;

        try {
            const createdProduct = await productsService.createProduct({ product });

            res.status(201).json({
                data: createdProduct,
                message: 'product created',
            });
        } catch (error) {
            next();
        };
    });

    router.put('/:productId',
    passport.authenticate('jwt', { session: false }),
    validationHandler(joi.object({ productId: productIdSchema }), 'params'),
    validationHandler(updateProductSchema),
    async function(req, res, next) {
        const { productId } = req.params;
        const { body: product } = req;

        try {
            const updatedProduct = await productsService.updateProduct({ product, productId });

            res.status(200).json({
                data: updatedProduct,
                message: 'product updated',
            });
        } catch (error) {
            next(error);
        };
    });

    router.delete('/:productId',
    passport.authenticate('jwt', { session: false }),
    async function(req, res, next) {
        const { productId } = req.params;

        try {
            const deletedProduct = await productsService.deleteProduct({ productId });

            res.status(200).json({
                data: deletedProduct,
                message: 'Product deleted',
            });
        } catch (error) {
            next(error);
        };
    });
};

module.exports = productsApi;