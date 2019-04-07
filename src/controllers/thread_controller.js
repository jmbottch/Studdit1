const Thread = require('../models/thread');
const User = require('../models/user');

module.exports = {

    findall(req, res) {
        Thread.find({})
        .then(threads => {
            res.status(200).send(threads)
        })
    },

    single(req, res) {
        Thread.findOne({_id: req.body._id})
        .then((thread) => {
            res.status(200).send(thread)
        })
    },

    create(req, res, next) {

        Thread.create({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author
        })
        .then(() => {
            res.status(200).send({Message:"Thread has been created."}),
            console.log('thread created')
            
            }).catch((err) => {
                res.status(401).send({err})
                console.log(err)
        })
    },

    edit(req, res, next) {
        Thread.findOne({_id: req.body._id})
        .then(thread => {
            if(thread === null) {
                res.status(401).send({Error: 'Thread does not exist'})
            } else {
                let titleToSet = req.body.title;
                let contentToSet = req.body.content;
        
                if(req.body.title === '' || req.body.title === null) titleToSet = thread.title
                if(req.body.content === '' || req.body.content === null ) contentToSet = thread.content;

                thread.set({
                    title: titleToSet,
                    content: contentToSet
                })
                thread.save()
                .then(() => res.status(200).send({Message: "Thread has been edited."}))
                .catch((err) => res.status(401).send({err})); 

            }
        })
    },

    delete(req, res, next) {
        Thread.findOne({
                _id: req.body._id
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
            .catch((err) => {
                res.status(401).send({Error: 'Something went wrong'})
            });
    }
};