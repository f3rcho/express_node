const express = require('express');
const path = require('path');
const productsRouter = require('./routes/views/products');
const productsApiRouter = require('./routes/api/products');
const { config } = require('./config/config');

const { logErrors, clientErrorHandler, errorHandler } = require('./utils/middleware/errorHandlers');

// App
const app = express();

// Body Parser
app.use(express.json());

// Static files
app.use('/static', express.static(path.join(__dirname, 'public')));

// View Engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Routes
app.use('/products', productsRouter);
app.use('/api/products', productsApiRouter);

// Redirect
app.get('/', function(req, res) {
    res.redirect('/products');
});

// Error Handler
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

// Server
app.listen(config.port, () => {
    console.log(`App listening on http://localhost:${config.port}`);
});