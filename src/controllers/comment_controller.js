const Comment = require('../models/comment');
const Thread = require('../models/thread')
const User = require('../models/user')

module.exports = {

    create(req, res, next) {
        User.findOne({
                username: req.body.username
            })
            .then((user) => {
                if (user === null) {
                    res.status(422).send({
                        Error: 'User not found'
                    })
                } else {
                    Thread.findOne({
                            title: req.body.title
                        })
                        .then((thread) => {
                            if (thread === null) {
                                res.status(422).send({
                                    Error: 'Thread not found'
                                })
                            } else {
                                const comment = new Comment({
                                    content: req.body.content,
                                    author: user
                                });
                                thread.comments.push(comment);
                                Promise.all([comment.save(), thread.save()])
                                    .then(() => res.status(201).send({
                                        Message: 'Comment posted'
                                    }))
                                    .catch(next);
                            }
                        })
                }
            });
    },

    createSubComment(req, res, next) {
        User.findOne({
            username: req.body.username
        })
        .then((user) => {
            if (user === null) {
                res.status(422).send({
                    Error: 'User not found'
                })
            } else {
                Comment.findOne({
                        content: req.body.comment
                    })
                    .then((comment) => {
                        if (comment === null) {
                            res.status(422).send({
                                Error: 'Comment not found'
                            })
                        } else {
                            const subComment = new Comment({
                                content: req.body.content,
                                author: user
                            });
                            comment.comments.push(subComment);
                            Promise.all([comment.save(), subComment.save()])
                                .then(() => res.status(201).send({
                                    Message: 'Comment posted'
                                }))
                                .catch(next);
                        }
                    })
            }
        });
    },

    edit(req, res, next) {
        Thread.findOne({
            title: req.body.title
        })
        .then(thread => {
            if (thread === null) {
                res.status(422).send({
                    Error: 'Thread does not exist.'
                })
            } else {
                Comment.findOne({
                    content: req.body.content
                })
                    .then((comment) => {
                        if (comment === null) {
                            res.status(422).send({
                                Error: 'Comment does not exist.'
                            })
                        } else {
                            comment.set('content', req.body.newContent)
                            comment.save()
                                .then(() => res.status(200).send({
                                    Message: 'Comment edited'
                                }))
                        }
                    })                    
            }
        })
        .catch(next);
    },

    delete(req, res, next) {
        const content = req.body.content;
        
        Thread.findOne({
                title: req.body.title
            })
            .then(thread => {
                if (thread === null) {
                    res.status(422).send({
                        Error: 'Thread does not exist m8.'
                    })
                } else {
                    Comment.findOne({
                        content: content
                    })
                        .then((comment) => {
                            if (comment === null) {
                                res.status(422).send({
                                    Error: 'Comment does not exist.'
                                })
                            } else {
                                comment.set('content', 'deleted')
                                comment.save()
                                    .then(() => res.status(200).send({
                                        Message: 'Comment deleted'
                                    }))
                            }
                        })                    
                }
            })
            .catch(next);
    },

    upvote(req, res, next) {
        User.findOne({
            username: req.body.username
        })
        .then((user) => {
            if (user === null) {
                res.status(422).send({
                    Error: 'User not found'
                })
            } else {
                Comment.findOne({
                        _id: req.body.id
                    })
                    .then((comment) => {
                        if (comment === null) {
                            res.status(422).send({
                                Error: 'Comment not found'
                            })
                        } else {
                            comment.comments.upvotes.findOne({_id: user._id})
                            .then((userid) => {
                                if(userid === null){
                                    comment.votes ++;
                                    comment.upvotes.push(user._id);
                                } else {
                                    res.status(422).send({
                                        Error: 'User already upvoted this comment'
                                    })
                                }
                            })
                        Promise.all([comment.save(), comment.upvotes.save()])
                            .then(() => res.status(201).send({
                                Message: 'Comment upvoted'
                            }))
                            .catch(next);
                        }
                    })
            }
        });
    },

    downvote(req, res, next){
        User.findOne({
            username: req.body.username
        })
        .then((user) => {
            if (user === null) {
                res.status(422).send({
                    Error: 'User not found'
                })
            } else {
                Comment.findOne({
                        _id: req.body.id
                    })
                    .then((comment) => {
                        if (comment === null) {
                            res.status(422).send({
                                Error: 'Comment not found'
                            })
                        } else {
                            comment.votes --;
                            Promise.all([comment.save()])
                                .then(() => res.status(201).send({
                                    Message: 'Comment downvoted'
                                }))
                                .catch(next);
                        }
                    })
            }
        });
    }
};