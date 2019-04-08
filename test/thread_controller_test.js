const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const chai = require('chai');
expect = chai.expect;

const User = mongoose.model('user');
const Thread = mongoose.model('thread');

describe('The thread_controller', () => {

    beforeEach((done) => {
        testUser = new User({
            username: 'TestUser',
            password: 'TestPassword'
        });
        testUser.save()
            .then(() => done()); //saves a test user before each test
    });
    it('can fetch a list of threads', (done) => {
        request(app)
        .get('/api/threads') //get all threads
        .end(function (err, res) {
            if(err){
                //console.log(err)
            } 
            else {
                expect(res.statusCode).to.equal(200)
                expect(res.body).to.be.an('Array')
                expect(res.body).to.be.empty
                done()
            }
        })
    })

    it('can fetch a single thread', function(done) {
        request(app)
        .post('/api/thread') //post a test thread
        .send({
                author: testUser._id,
                title: "Test Post",
                content: "Test post content",
                votes: 0
            })
            .then(()=> {
                Thread.findOne({ title: 'Test Post'}) //find the test thread
                .then((foundThread) => {
                    request(app)
                    .get('/api/thread/' + foundThread._id) //find testthread by id
                    .end(function (err, res) {
                        //console.log(foundThread)
                        if(err) //console.log(err)
                        expect(res.statusCode).to.equal(200) //check for statuscode 200
                        done()
                    })
                })
            })

    })

    it('can create a new thread', (done) => {
        request(app)
            .post('/api/thread') //post a test thread
            .send({
                author: testUser._id,
                title: "Test Post",
                content: "Test post content",
                votes: 0
            }).end(function (err, res) {
                if(err) //console.log(err)
                expect(res.statusCode).to.equal(200) //check for statuscode 200
                done()
            })
        
            
    });

    it('can change the content of an existing thread', (done) => {
        request(app)
            .post('/api/thread') //post a test thread
            .send({
                author: testUser._id,
                title: "Test Post",
                content: "Test post content",
                votes: 0
            })
            .then(() => {
                Thread.findOne({title: "Test Post"}) //find the test thread
                .then((fountThread) =>{
                    request(app)
                    .put('/api/thread') //edit the thread with new data
                    .send({
                        _id: fountThread._id,
                        author: testUser._id,
                        title: 'Edited Post',
                        content: 'Edited Post Content',
                        votes: 2
                    })
                    .end(function(err, res) {
                        if(err) //console.log(err)
                        expect(res.statusCode).to.equal(200) //check for statuscode 200
                        done()
                    })
                })
            })
    });

    it('can set a thread to deleted', (done) => {
        request(app)
        .post('/api/thread') //post a test thread
        .send({
            author: testUser._id,
            title: "Test Post",
            content: "Test post content",
            votes: 0
        })
        .then(() => {
            Thread.findOne({title: "Test Post"}) //find the test thread
            .then((fountThread) =>{
                request(app)
                .put('/api/thread/delete') //edit the thread with new data
                .send({
                    _id: fountThread._id,
                })
                .end(function(err, res) {
                    if(err) //console.log(err)
                    expect(res.statusCode).to.equal(200) //check for statuscode 200
                    done()
                })
            })
        })
    });
});