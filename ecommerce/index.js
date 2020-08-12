const express = require('express');
const path = require('path');
const boom = require('@hapi/boom');
const productsRouter = require('./routes/views/products');
const productsApiRouter = require('./routes/api/products');
const authApiRouter = require('./routes/api/auth');
const { config } = require('./config/config');

const isRequestAjaxOrApi = require('./utils/isRequestAjaxOrApi');

const { logErrors, clientErrorHandler, errorHandler, wrapErrors } = require('./utils/middleware/errorHandlers');

// App
const app = express();

// Express Slash middleware
app.enabled('strict routing');

// Body Parser
app.use(express.json());

// Static files
app.use('/static', express.static(path.join(__dirname, 'public')));

// View Engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.enable('strict routing');

// Routes
app.use('/products', productsRouter);
app.use('/api/products', productsApiRouter);
app.use('/api/auth', authApiRouter);

// Redirect
app.get('/', function(req, res) {
    res.redirect('/products');
});

// Not found
app.use(function (req, res, next) {
    if(isRequestAjaxOrApi(req)) {
        const { output: { statusCode, payload}} = boom.notFound();
        res.status(statusCode).json(payload);
    }
    res.status(404).render('404');
});

// Error Handler
app.use(logErrors);
app.use(wrapErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

// Server
app.listen(config.port, () => {
    console.log(`App listening on http://localhost:${config.port}`);
});