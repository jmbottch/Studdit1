const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

const User = mongoose.model('user');
const Thread = mongoose.model('thread');

describe('The comment_controller', () => {

    beforeEach((done) => {
        testUser = new User({
            username: 'TestUser',
            password: 'TestPassword'
        });
        testUser.save()
            .then(() => done());
    });

    it('can create a new thread', (done) => {
        request(app)
            .post('/api/thread')
            .send({
                username: 'TestUser',
                title: "Test Post",
                content: "Test post content"
            })
            .end(() => {
                Thread.findOne({ title: "Test Post"})
                    .then((thread) => {
                        assert(thread.content === "Test post content");
                        done();
                    }) 
            })
    });

    it('can change the content of an existing thread', (done) => {
        request(app)
        .post('/api/thread')
        .send({
            username: 'TestUser',
            title: "Test Post",
            content: "Test post content"
        })
        .end(() => {
            request(app)
                .put('/api/thread')
                .send({
                    title: 'Test Post',
                    content: 'Test Post edited'
                })
                .end(() => {
                    Thread.findOne({ title: 'Test Post' })
                        .then((thread) => {
                            assert(thread.content === 'Test Post edited');
                            done();
                        })
                })
        })
    });

    it('can delete a thread', (done) => {
        request(app)
        .post('/api/thread')
        .send({
            username: 'TestUser',
            title: "Test Post",
            content: "Test post content"
        })
        .end(() => {
            Thread.findOne({ title: 'Test Post' })
                .then((thread) => {
                    request(app)
                        .delete('/api/thread')
                        .send({
                            title: 'Test Post'
                        })
                        .end(() => {
                            Thread.findById({ _id: thread._id })
                                .then((thr) => {
                                    assert(thr.title === 'deleted');
                                    done();
                                })
                        })
                })
        })
    });
});