const MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;
const express = require('express');
const bodyParser = require('body-parser')
const routes = require('./routes/routes');
const app = express();
const User = require('./src/models/user');
const neo4j = require('neo4j-driver').v1;
var mongodb = require('./src/config/mongodb_connector');
const config = require('./src/config/mongodb_config');

const driver = neo4j.driver('bolt://hobby-ccflbaaccbcogbkemkneffbl.dbs.graphenedb.com:24786', 
neo4j.auth.basic('jeroen', 'b.m1mQSF3xsOsB.5LbY3TnSpyUejZ6B'), console.log("Neo4j is connected on port 3000"));

app.use(bodyParser.json());
routes(app);

app.listen(config.env.webPort, () => {
  console.log('App is ready for requests on localhost:3050')
})

module.exports = app;