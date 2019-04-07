const assert = require('assert');
const request = require('supertest');
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
            .get('/api/comments')
            .end(function (err, res) {
                if (err) console.log(err)
                expect(res.statusCode).to.equal(200)
                done();
            })
    })

    it('can fetch a single comment', function (done) {
        request(app)
            .post('/api/user')
            .send(testUser)
            .then(() => {
                User.findOne({ username: 'testuser' })
                    .then((user) => {
                        request(app)
                            .post('/api/thread/comment')
                            .send(testComment)
                            .then(() => {
                                Comment.findOne({ content: 'TestComment content' })
                                    .then((foundComment) => {
                                        request(app)
                                            .get('/api/comment/' + foundComment._id)
                                            .end(function (err, res) {
                                                if (err) console.log(err);
                                                expect(res.statusCode).to.equal(200)
                                                done()
                                            })
                                    })


                            })
                    })
            })
    })


it('can create a new comment', function (done) {
    request(app)
        .post('/api/user')
        .send(testUser)
        .then(() => {
            User.findOne({ username: 'testuser' })
                .then((user) => {
                    request(app)
                        .post('/api/thread/comment')
                        .send(testComment)
                        .end(function (err, res) {
                            if (err) console.log(err)
                            expect(res.statusCode).to.equal(200)
                            done();
                        })
                })
        })
})

it('can edit an existing comment', function (done) {
    request(app)
        .post('/api/user')
        .send(testUser)
        .then(() => {
            User.findOne({ username: 'testuser' })
                .then((user) => {
                    request(app)
                        .post('/api/thread/comment')
                        .send(testComment)
                        .then(() => {
                            Comment.findOne({ content: 'TestComment content' })
                                .then((comment) => {
                                    request(app)
                                        .put('/api/comment/' + comment._id)
                                        .send(editedComment)
                                        .end(function (err, res) {
                                            if (err) console.log(err)
                                            expect(res.statusCode).to.equal(200)
                                            done()
                                        })
                                })

                        })
                })
        })
})

xit('can set a comment to deleted', function (done) {
    request(app)
        .post('/api/user')
        .send(testUser)
        .then(() => {
            User.findOne({ username: 'testuser' })
                .then((user) => {
                    request(app)
                        .post('/api/thread/comment')
                        .send(testComment)
                        .then((testComment) => {
                            request(app)
                                .put('/api/comment/delete')
                                .send({
                                    _id: testComment._id
                                }).
                                end(function (err, res) {
                                    if (err) console.log(err)
                                    expect(res.statusCode).to.equal(200)
                                    done();
                                })
                        })
                })
        })
})



    // it('can create a new comment in an existing thread', (done) => {
    //     request(app)
    //         .post('/api/thread/comment')
    //         .send({
    //             username: "TestUser",
    //             title: "Test Thread",
    //             content: "Test post comment"
    //         })
    //         .end(() => {
    //             Thread.findOne({
    //                     title: "Test Thread"
    //                 })
    //                 .then((thread) => {
    //                     Comment.findOne({
    //                             content: "Test post comment"
    //                         })
    //                         .then((comment) => {
    //                             assert(comment.content === "Test post comment");
    //                             done();
    //                         })
    //                 })
    //         })
    // });

    // it('can create a subcomment under an existing comment', (done) => {
    //     request(app)
    //         .post('/api/thread/comment')
    //         .send({
    //             username: "TestUser",
    //             title: "Test Thread",
    //             content: "Test post comment"
    //         })
    //         .end(() => {
    //             Thread.findOne({
    //                     title: "Test Thread"
    //                 })
    //                 .then((thread) => {
    //                     Comment.findOne({
    //                             content: "Test post comment"
    //                         })
    //                         .then(() => {
    //                             request(app)
    //                                 .post('/api/comment')
    //                                 .send({
    //                                     username: "TestUser",
    //                                     comment: "Test post comment",
    //                                     content: "Subcomment"
    //                                 })
    //                                 .end(() => {
    //                                     Thread.findOne({
    //                                             title: "Test Thread"
    //                                         })
    //                                         .then((thread) => {
    //                                             Comment.findOne({
    //                                                     content: "Test post comment"
    //                                                 })
    //                                                 .then((comment) => {
    //                                                     assert(comment.comments !== null);
    //                                                     done();
    //                                                 })
    //                                         })
    //                                 })
    //                         })
    //                 })
    //         })
    // });

    // xit('can change the content of an existing comment', (done) => {
    //     request(app)
    //         .post('/api/thread/comment')
    //         .send({
    //             username: "TestUser",
    //             title: "Test Thread",
    //             content: "Test post comment"
    //         })
    //         .end(() => {
    //             request(app)
    //                 .put('/api/comment/edit')
    //                 .send({
    //                     title: 'Test Thread',
    //                     content: 'Test post comment',
    //                     newContent: 'Edited comment'
    //                 })
    //                 .end(() => {
    //                     Thread.findOne({
    //                         title: "Test Thread"
    //                     })
    //                     .then((thread) => {
    //                         Comment.findOne({
    //                                 content: "Edited comment"
    //                             })
    //                             .then((comment) => {
    //                                 assert(comment.content === "Edited comment");
    //                                 done();
    //                             })
    //                     })
    //                 })
    //         })
    // });

    // xit('can delete a thread', (done) => {
    //     request(app)
    //         .post('/api/thread')
    //         .send({
    //             username: 'TestUser',
    //             title: "Test Post",
    //             content: "Test post content"
    //         })
    //         .end(() => {
    //             Thread.findOne({
    //                     title: 'Test Post'
    //                 })
    //                 .then((thread) => {
    //                     request(app)
    //                         .delete('/api/thread')
    //                         .send({
    //                             title: 'Test Post'
    //                         })
    //                         .end(() => {
    //                             Thread.findById({
    //                                     _id: thread._id
    //                                 })
    //                                 .then((thr) => {
    //                                     assert(thr.title === 'deleted');
    //                                     done();
    //                                 })
    //                         })
    //                 })
    //         })
    // });
});
