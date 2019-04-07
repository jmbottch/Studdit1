const assert = require('assert');
const User = require('../model/user');
const request = require('supertest');
const app = require('../server');

describe('USERS:', () => {
    it('POST to /api/users/ saves a user', done => {
        User.count().then(count => {
            request(app)
                .post('/api/user/')
                .send({ name: 'dion', password: 'password123' })
                .set('Accept', 'application/json')
                //            .expect('Content-Type', /json/)
                .expect(200, done)
        })
    })
    it('PUT to /api/users/ edits a password', done => {
        const user = new User({name: 'dion', password:'password123'})
        user.save().then(() => {
            User.count().then(count => {
                request(app)
                    .put('/api/user/')
                    .send({ name: 'dion', password: 'password123', newPassword: 'wachtw00rd1' })
                    .set('Accept', 'application/json')
                    //            .expect('Content-Type', /json/)
                    .expect(200, done)
            })
        })
    })

    it('DELETE to /api/users/ deletes a user', done => {
        const user = new User({name: 'dion', password:'password123'})
        user.save().then(() => {
            User.count().then(count => {
                request(app)
                    .delete('/api/user/')
                    .send({ name: 'dion', password: 'password123' })
                    .expect(200, done)})
        })
    })
});
