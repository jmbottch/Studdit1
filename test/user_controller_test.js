const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

const User = mongoose.model('user');

describe('The user_controller', () => {

    it('can create a new user', (done) => {
        User.countDocuments().then(count => {

            request(app)
                .post('/api/user')
                .send({
                    username: 'TestUser',
                    password: 'TestPassword'
                })
                .end(() => {
                    User.countDocuments().then(newCount => {
                        assert(count + 1 === newCount);
                        done();
                    })
                })
        })
    });

    it('can change the password of an existing user', (done) => {
        request(app)
            .post('/api/user')
            .send({
                username: 'TestUser',
                password: 'TestPassword'
            })
            .end(() => {
                request(app)
                    .put('/api/user')
                    .send({
                        username: 'TestUser',
                        password: 'TestPassword',
                        newPassword: 'TestPassword1'
                    })
                    .end(() => {
                        User.findOne({ username: 'TestUser' })
                            .then(user => {
                                assert(user.password === 'TestPassword1');
                                done();
                            })
                    })
            })
    })

    it('can set a user to inactive', (done) => {
        request(app)
            .post('/api/user')
            .send({
                username: 'TestUser',
                password: 'TestPassword'
            })
            .end(() => {
                request(app)
                    .delete('/api/user')
                    .send({
                        username: 'TestUser',
                    })
                    .end(() => {
                        User.findOne({ username: 'TestUser' })
                            .then(user => {
                                assert(user.active === false);
                                done();
                            })
                    })
            })
    })
});