const assert = require('assert');
const User = require('../src/models/user');
const request = require('supertest');
const app = require('../server');

describe('The user_controller', () => {
    it('can create a new user', done => {
        User.count().then(count => {
            request(app)
                .post('/api/user/')
                .send({ username: 'TestUser', password: 'password123' })
                .set('Accept', 'application/json')
                .expect(200, done)
        })
    });

    it('can change a users password', done => {
        const user = new User({username: 'TestUser', password:'password123'});
        user.save().then(() => {
            User.count().then(count => {
                request(app)
                    .put('/api/user/')
                    .send({ username: 'TestUser', password: 'password123', newPassword: 'password12345' })
                    .set('Accept', 'application/json')
                    .expect(200, done)
            })
        })
    });

    it('can set a user to inactive', done => {
        const user = new User({username: 'TestUser', password:'password123'});
        user.save().then(() => {
            User.count().then(count => {
                request(app)
                    .delete('/api/user/')
                    .send({ username: 'TestUser', password: 'password123' })
                    .expect(200, done)})
        })
    })
});
