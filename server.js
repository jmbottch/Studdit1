const MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;
const express = require('express');
const bodyParser = require('body-parser')
const routes = require('./routes/routes');
const app = express();
const User = require('./src/models/user');
const neo4j = require('neo4j-driver').v1;





const driver = neo4j.driver('bolt://hobby-ccflbaaccbcogbkemkneffbl.dbs.graphenedb.com:24786', 
neo4j.auth.basic('jeroen', 'b.m1mQSF3xsOsB.5LbY3TnSpyUejZ6B'), console.log("Neo4j is connected on port 3000"));




app.use(bodyParser.json());
routes(app);

MongoClient.connect('mongodb://admin:admin123@ds151631.mlab.com:51631/studditmongo', {useNewUrlParser: true}, (err, db) => {
 
var dbase = db.db("studditmongo");
  if (err) return console.log(err)
  app.listen(process.env.PORT || 3050, () => {
    console.log('MongoDB is connected on 3050')
  })

  routes(app);
});

