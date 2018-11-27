const assert = require('assert');
const User = require('../src/models/user');
const Thread = require('../src/models/thread');
const Comment = require('../src/models/comment');

describe('Creating records', () => {

    beforeEach((done) => {
        joe = new User({ 
            username: 'joepgruter',
            password: 'password' 
        });
        thread = new Thread({
            title: 'first post',
            content: 'lorem ipsum',
            author: joe._id
        });
        comment1 = new Comment({
            author: joe._id,
            content: 'nice comment',        
        });
        comment = new Comment({
            author: joe._id,
            content: 'nice post',
            comments: [comment1]
        });

        joe.threads.push(thread);
        thread.comments.push(comment);
        //comment.comments.push(comment1);

        Promise.all([joe.save(), thread.save(), comment.save()])
            .then(() => done());
    });

    it('finds a user', (done) => {
        User.find({ username: 'joepgruter' })
            .then((users) => {
                assert(users[0]._id.toString() === joe._id.toString());
                done();
            }).catch((err) => done(err));
    });

    it('finds a thread', (done) => {
        Thread.find({ title: 'first post' })
            .then((threads) => {
                assert(threads[0]._id.toString() === thread._id.toString());
                done().catch((err) => done(err));
            });
    });

    it('finds a comment', (done) => {
        Comment.find({ author: joe._id })
            .then((comments) => {
                assert(comments[0].content === 'nice post');
                done().catch((err) => done(err));
            });
    });

    xit('finds a nested comment', (done) => {
        Comment.find({ author: joe._id })
            .then((comments) => {
                assert(comments[0].comments[0].content === 'nice comment');
                done().catch((err) => done(err));
            });
    });
});