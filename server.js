const MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;
const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const User = require('./src/models/user');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api', (req, res) => {
    res.send({test: 'succes'});
});


MongoClient.connect('mongodb://admin:admin123@ds151631.mlab.com:51631/studditmongo', (err, db) => {
  var dbase = db.db("studditmongo");
  if (err) return console.log(err)
  app.listen(3000, () => {
    console.log('app working on 3000')
  })

app.post('user/add', (req, res, next) => {
    var user = new User({
      username: req.body.username,
      password: req.body.password,
      threads: [req.body.threads]
    });

    dbase.collection("user").save(user, (err, result) => {
      if(err) {
        console.log(err);
        
      }

      res.send('User added successfully');
    });
  });
})