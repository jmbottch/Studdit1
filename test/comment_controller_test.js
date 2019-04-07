const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
var chai = require('chai');
var expect = chai.expect;

const User = mongoose.model('user');
const Thread = mongoose.model('thread');
const Comment = mongoose.model('comment');

describe('The comment_controller', () => {
    testUser = new User({
        username: 'testuser',
        password: 'testpassword'
    })

    testComment = new Comment({
        content: 'TestComment content',
        author: testUser._id
    })

    editedComment = new Comment({
        content: 'Edited Content',
        author: testUser._id
    })

    it('can fetch a list of comments', function (done) {
        request(app)
            .get('/api/comments') //get all
            .end(function (err, res) {
                if (err) console.log(err)
                expect(res.statusCode).to.equal(200) //check for status code 200
                expect(res.body).to.be.an('Array') //check if the list is indeed an array
                done();
            })
    })

    it('can fetch a single comment', function (done) {
        request(app)
            .post('/api/user') //post a test user
            .send(testUser)
            .then(() => {
                User.findOne({ username: 'testuser' })
                    .then((user) => {
                        request(app)
                            .post('/api/thread/comment') //post a test comment
                            .send(testComment)
                            .then(() => {
                                Comment.findOne({ content: 'TestComment content' }) //find the test comment
                                    .then((foundComment) => {
                                        request(app)
                                            .get('/api/comment/' + foundComment._id) //get the testcomment on its id
                                            .end(function (err, res) {
                                                if (err) console.log(err);
                                                expect(res.statusCode).to.equal(200) //check for statuscode 200
                                                done()
                                            })
                                    })


                            })
                    })
            })
    })


it('can create a new comment', function (done) {
    request(app)
        .post('/api/user') // post a test user
        .send(testUser)
        .then(() => {
            User.findOne({ username: 'testuser' })
                .then((user) => {
                    request(app)
                        .post('/api/thread/comment') //post the comment
                        .send(testComment)
                        .end(function (err, res) {
                            if (err) console.log(err)
                            expect(res.statusCode).to.equal(200) //check for statuscode 200
                            done();
                        })
                })
        })
})

it('can edit an existing comment', function (done) {
    request(app)
        .post('/api/user') //post a test user
        .send(testUser)
        .then(() => {
            User.findOne({ username: 'testuser' })
                .then((user) => {
                    request(app)
                        .post('/api/thread/comment') //post a test comment
                        .send(testComment)
                        .then(() => {
                            Comment.findOne({ content: 'TestComment content' }) //find the comment
                                .then((comment) => {
                                    request(app)
                                        .put('/api/comment') //edit the data in this comment
                                        .send({
                                            _id: comment._id,
                                            content: 'Edited Content',
                                            author: testUser._id
                                        })
                                        .end(function (err, res) {
                                            if (err) console.log(err)
                                            expect(res.statusCode).to.equal(200) //check for statuscode 200
                                            done()
                                        })
                                })

                        })
                })
        })
})

it('can set a comment to deleted', function (done) {
    request(app)
        .post('/api/user')
        .send(testUser) //post a test user
        .then(() => {
            User.findOne({ username: 'testuser' })
                .then((user) => {
                    request(app)
                        .post('/api/thread/comment') // post a test comment
                        .send(testComment)
                        .then(() => {
                            Comment.findOne({ content: 'TestComment content'}) //find the test comment
                            .then((foundComment1) => {                            
                            request(app)
                                .put('/api/comment/delete') //edit the content of testcomment to deleted
                                .send({
                                    _id: foundComment1._id
                                })
                                .end(function (err, res) {
                                    if (err) console.log(err)
                                    expect(res.statusCode).to.equal(200) //check if statuscode is 200
                                    done();
                                })
                        })
                        })
                        
                })
        })
})
});
