const express = require('express');
const app = express();
const path = require('path');
const productsRouter = require('./routes/products');
const productsApiRouter = require('./routes/api/products');

app.use('/static', express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/products', productsRouter);
app.use('/api/products', productsApiRouter);

const server = app.listen(8000, () => {
    console.log(`App listening on http://localhost:${server.address().port}/products`);
});