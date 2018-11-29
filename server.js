const MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;
const express = require('express');
const bodyParser = require('body-parser')
const routes = require('./routes/routes');
const app = express();
var mongodb = require('./src/config/mongodb_connector');
const config = require('./src/config/mongodb_config');

app.use(bodyParser.json());
routes(app);

app.listen(config.env.webPort, () => {
  console.log('App is ready for requests on localhost:3000')
})

module.exports = app;