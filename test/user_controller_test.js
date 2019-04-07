// const assert = require('assert');
// const request = require('supertest');
// const app = require('../app');
// const mongoose = require('mongoose');
// var chai = require('chai');
// var expect = chai.expect;

// const User = mongoose.model('user');

// describe('The user_controller', () => {

//     testUser = new User({
//         _id: '5ca9fb70bd79873dd4c99c1e',
//         username: 'TestUser',
//         password: 'TestPassword'
//     });

//     newTestUser = new User({
//         _id: '5ca9fb70bd79873dd4c99c1e',
//         username: 'TestUser2',
//         password: 'TestPassword2'
//     })

//     it('can create a new user', (done) => {
//         User.countDocuments().then(count => {

//             request(app)
//                 .post('/api/user')
//                 .send({
//                     username: 'TestUser',
//                     password: 'TestPassword'
//                 })
//                 .end(() => {
//                     User.countDocuments().then(newCount => {
//                         assert(count + 1 === newCount);
//                         done();
//                     })
//                 })
//         })
//     });

//     it('can change the password of an existing user', function (req, done) {

//         request(app)
//         .post('/api/user')
//         .send(testUser)
//         .then(() => {
//             User.findOne({ _id: testUser._id })
//             .then(foundUser => {
//                 request(app)
//                     .put('/api/user/:id', testUser._id)
//                     .send(newTestUser)
//                     .end(function (err, res) {
//                         expect(res.statusCode).to.equal(200);
//                         if (err) console.log(err);
//                         done();
//                     })
//             })
//         })
       
//     })



//     it('can set a user to inactive', (done) => {
//         request(app)
//             .post('/api/user')
//             .send({
//                 username: 'TestUser',
//                 password: 'TestPassword'
//             })
//             .end(() => {
//                 request(app)
//                     .delete('/api/user')
//                     .send({
//                         username: 'TestUser',
//                     })
//                     .end(() => {
//                         User.findOne({ username: 'TestUser' })
//                             .then(user => {
//                                 assert(user.active === false);
//                                 done();
//                             })
//                     })
//             })
//     })
// });
