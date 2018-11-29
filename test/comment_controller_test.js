const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

const User = mongoose.model('user');
const Thread = mongoose.model('thread');
const Comment = mongoose.model('comment');

describe('The thread_controller', () => {

    beforeEach((done) => {
        testUser = new User({
            username: 'TestUser',
            password: 'TestPassword'
        });

        testThread = new Thread({
            author: testUser._id,
            title: 'Test Thread',
            content: 'Test thread content'
        });

        Promise.all([testUser.save(), testThread.save()])
            .then(() => done());
    });

    it('can create a new comment in an existing thread', (done) => {
        request(app)
            .post('/api/thread/comment')
            .send({
                username: "TestUser",
                title: "Test Thread",
                content: "Test post comment"
            })
            .end(() => {
                Thread.findOne({
                        title: "Test Thread"
                    })
                    .then((thread) => {
                        Comment.findOne({
                                content: "Test post comment"
                            })
                            .then((comment) => {
                                assert(comment.content === "Test post comment");
                                done();
                            })
                    })
            })
    });

    it('can create a subcomment under an existing comment', (done) => {
        request(app)
            .post('/api/thread/comment')
            .send({
                username: "TestUser",
                title: "Test Thread",
                content: "Test post comment"
            })
            .end(() => {
                Thread.findOne({
                        title: "Test Thread"
                    })
                    .then((thread) => {
                        Comment.findOne({
                                content: "Test post comment"
                            })
                            .then(() => {
                                request(app)
                                    .post('/api/comment')
                                    .send({
                                        username: "TestUser",
                                        comment: "Test post comment",
                                        content: "Subcomment"
                                    })
                                    .end(() => {
                                        Thread.findOne({
                                                title: "Test Thread"
                                            })
                                            .then((thread) => {
                                                Comment.findOne({
                                                        content: "Test post comment"
                                                    })
                                                    .then((comment) => {
                                                        assert(comment.comments !== null);
                                                        done();
                                                    })
                                            })
                                    })
                            })
                    })
            })
    });

    xit('can change the content of an existing comment', (done) => {
        request(app)
            .post('/api/thread/comment')
            .send({
                username: "TestUser",
                title: "Test Thread",
                content: "Test post comment"
            })
            .end(() => {
                request(app)
                    .put('/api/comment/edit')
                    .send({
                        title: 'Test Thread',
                        content: 'Test post comment',
                        newContent: 'Edited comment'
                    })
                    .end(() => {
                        Thread.findOne({
                            title: "Test Thread"
                        })
                        .then((thread) => {
                            Comment.findOne({
                                    content: "Edited comment"
                                })
                                .then((comment) => {
                                    assert(comment.content === "Edited comment");
                                    done();
                                })
                        })
                    })
            })
    });

    xit('can delete a thread', (done) => {
        request(app)
            .post('/api/thread')
            .send({
                username: 'TestUser',
                title: "Test Post",
                content: "Test post content"
            })
            .end(() => {
                Thread.findOne({
                        title: 'Test Post'
                    })
                    .then((thread) => {
                        request(app)
                            .delete('/api/thread')
                            .send({
                                title: 'Test Post'
                            })
                            .end(() => {
                                Thread.findById({
                                        _id: thread._id
                                    })
                                    .then((thr) => {
                                        assert(thr.title === 'deleted');
                                        done();
                                    })
                            })
                    })
            })
    });
});