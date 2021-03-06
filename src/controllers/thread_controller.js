const Thread = require('../models/thread');
const User = require('../models/user');

module.exports = {

    create(req, res, next) {
        const threadProps = req.body;

        User.findOne({
                username: req.body.username
            })
            .then((user) => {
                if (user === null) {
                    res.status(422).send({
                        Error: 'User not found'
                    })
                } else {
                    Thread.create({
                            "title": req.body.title,
                            "content": req.body.content,
                            "author": user._id,
                        })
                        .then(() => res.status(201).send({
                            Message: 'Thread created'
                        }))
                        .catch(next);
                }
            });
    },

    edit(req, res, next) {
        const title = req.body.title;
        const newContent = req.body.content;

        Thread.findOne({
            title: title
        })
        .then((thread) => {
            if(thread === null){
                res.status(422).send({
                    Error: 'Thread does not exist.'
                })
            } else {
                thread.set('content', newContent)
                thread.save()
                    .then(thread => res.status(200).send({
                        Message: 'Thread edited'
                    }))
            }

        })
        .catch(next);
    },

    delete(req, res, next) {
        const title = req.body.title;

        Thread.findOne({
                title: title
            })
            .then(thread => {
                if (thread === null) {
                    res.status(422).send({
                        Error: 'Thread does not exist.'
                    })
                } else {
                    thread.set('title', 'deleted')
                    thread.set('content', 'deleted')
                    thread.save()
                        .then(thread => res.status(200).send({
                            Message: 'Thread deleted'
                        }))
                }
            })
            .catch(next);
    }
};