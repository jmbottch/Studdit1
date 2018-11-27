const express = require('express');
const app = express();


app.get('/api', (req, res) => {
    res.send({ test: 'succes' });
});

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

module.exports = app;