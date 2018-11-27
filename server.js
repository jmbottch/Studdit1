const MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;
const express = require('express');
const bodyParser = require('body-parser')
const routes = require('./routes/routes');
const app = express();
const User = require('./src/models/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

MongoClient.connect('mongodb://admin:admin123@ds151631.mlab.com:51631/studditmongo', (err, db) => {
  var dbase = db.db("studditmongo");
  if (err) return console.log(err)
  app.listen(process.env.PORT || 3000, () => {
    console.log('app working on 3000')
  })

  routes(app);
});
