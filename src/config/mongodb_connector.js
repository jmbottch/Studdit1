const mongoose = require('mongoose');
const config = require('./mongodb_config');
mongoose.Promise = global.Promise;

mongoose.connect(config.dburl, { useNewUrlParser: true });
var connection = mongoose.connection
    .once('open', () => console.log('Connected to Mongo on MLab via heroku'))
    .on('error', (error) => {
        console.warn('Warning', error.toString());
    });

module.exports = {
    connection,

};
