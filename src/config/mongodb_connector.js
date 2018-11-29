const mongoose = require('mongoose');
const config = require('./mongodb_config');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://admin:admin123@ds151631.mlab.com:51631/studditmongo', { useNewUrlParser: true });
    var connection = mongoose.connection
    .once('open', () => console.log('Connected to Mongo on ' + config.dburl))
    .on('error', (error) => {
        console.warn('Warning', error.toString());
    });

module.exports = connection;