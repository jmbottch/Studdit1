const express = require('express');
const app = express();
var App = require("app.json")

app.get('/api', (req, res) => {
    res.send({ test: 'succes' });
});

module.exports = app;