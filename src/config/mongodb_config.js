var env = {
    webPort: process.env.PORT || 3050,
    dbHost: process.env.DB_HOST || 'ds151631.mlab.com',
    dbPort: process.env.DB_PORT || '51631',
    dbUser: process.env.DB_USER || 'jmbottch',
    dbPassword: process.env.DB_PASSWORD || 'admin',
    dbDatabase: process.env.DB_DATABASE || 'studditmongo'
}

// var dburl = process.env.NODE_ENV === 'production' ?
//     'mongodb://' + env.dbUser + ':' + env.dbPassword + '@' + env.dbHost + ':' + env.dbPort + '/' + env.dbDatabase :
//     'mongodb://localhost/' + env.dbDatabase

var dburl = 'mongodb://' + env.dbUser + ':' + env.dbPassword + '@' + env.dbHost + ':' + env.dbPort + '/' + env.dbDatabase;

module.exports = {
    env: env,
    dburl: dburl
};