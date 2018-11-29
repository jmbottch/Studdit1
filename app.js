const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

const app = express();

app.use(bodyParser.json());
routes(app);

app.use((err, req, res, next) => {
    res.status(422).send({
        error: err.message
    });
});

module.exports = app;