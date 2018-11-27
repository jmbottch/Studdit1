const MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;
const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const User = require('./src/models/user');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.configure(function(){
    app.use(express.favicon());
    app.use(express.static(settings.c.WEB_PATH + '/public'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.methodOverride());
    app.use(useragent.express());
  
    app.use(passport.initialize());
    app.use(passport.session());
});

MongoClient.connect('mongodb://admin:admin123@ds151631.mlab.com:51631/studditmongo', (err, db) => {
  var dbase = db.db("studditmongo");
  if (err) return console.log(err)
  app.listen(3000, () => {
    console.log('app working on 3000')
  })

  app.get('/api', (req, res) => {
    res.send({test: 'succes'});
});

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
});
