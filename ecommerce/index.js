const express = require('express');
const app = express();

app.get('*', (req, res, next) => {
    res.json({ hello: 'World'});
});

const server = app.listen(8000, () => {
    console.log(`App listening on http://localhost:${server.address().port}`);
});