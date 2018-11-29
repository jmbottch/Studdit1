const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

before((done) => {
    mongoose.connect('mongodb://localhost/studdit', { useNewUrlParser: true });

    mongoose.connection
        .once('open', () => { done(); })
        .on('error', (error) => { console.warn('Error: ', error); });
});

beforeEach((done) => {
    const { users, comments, threads } = mongoose.connection.collections;
    users.drop(() => {
        comments.drop(() => {
            threads.drop(() => {
                done();
            });
        });
    });
});