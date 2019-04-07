const mongoose = require('mongoose');
const config = require('./mongodb_config');

mongoose.Promise = global.Promise;

function createProductionConnection () {
    mongoose.connect('mongodb://admin:admin123@ds151631.mlab.com:51631/studditmongo', { useNewUrlParser: true });
    var connection = mongoose.connection
    .once('open', () => console.log('Connected to Mongo on ' + config.dburl))
    .on('error', (error) => {
        console.warn('Warning', error.toString());
    });
}

function createTestConnection() {
    mongoose.connect('mongodb://localhost/studdit', {useNewUrlParser: true})
    var connection = mongoose.connection
    .once('open', () => console.log('Connected to mongo on localhost to test'))
    .on ('error', (error) => {
        console.warn('Warning ', error.toString());
    })
}
module.exports = {
    connection,
    createProductionConnection,
    createTestConnection
};
