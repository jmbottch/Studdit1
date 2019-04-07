const Comment = require('../models/comment');
const Thread = require('../models/thread')
const User = require('../models/user')

module.exports = {

    findall(req, res) {
        Comment.find({})
        .then((comments) => {
            res.status(200).send(comments)
        })
    },

    single(req,res) {
        Comment.findOne({_id: req.body._id})
        .then((comment) => {
            res.status(200).send(comment)
        })
    },

    create(req, res, next) {
        Comment.create({
            content : req.body.content,
            votes : 0,
            author : req.body.author
        })
        .then(() => {
            res.status(200).send({Message: 'Comment has been created'}),
            console.log('comment created')
            }).catch((err) => {
                res.status(401).send({err})
        })
    },

    edit(req, res, next) {
        Comment.findOne({ _id: req.body._id})
        .then(comment => {
            if(comment === null) {
                res.status(401).send({Error: 'comment not found'})
            } else {
                let contentToSet = req.body.content;
                let commentsToSet = req.body.comments;

                if(req.body.content === '' || req.body.content === null) contentToSet = comment.content
                if(req.body.comments === '' || req.body.comments === null) commentsToSet = comment.comments

                comment.set({
                    content: contentToSet,
                    comments: commentsToSet
                })
                comment.save()
                .then(() => res.status(200).send({Message: "Comment has been edited."}))
                .catch((err) => res.status(401).send({err}));    
            }
        })
    },

    delete(req, res, next) {
        Comment.findOne({
                _id: req.body._id
            })
            .then(comment => {
                if (comment === null) {
                    res.status(422).send({
                        Error: 'Comment does not exist.'
                    })
                } else {
                    let deleted = 'deleted';
                    comment.set({
                        content: deleted
                    })
                    comment.save()
                    .then(() => res.status(200).send({Message: "Comment has been removed."}))
                    .catch((err) => res.status(401).send({err}));
                }
            })
            .catch((err) => {
                res.status(401).send({Error: 'Something went wrong'})
            });
    },
};