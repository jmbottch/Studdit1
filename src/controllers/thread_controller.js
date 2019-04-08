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

    create(req, res){
        User.findById({ _id: req.body.author })
        .then((user) => {
        if (user == undefined){
            res.status(422).send({ Error :'User does not exist.'})
        } else {
            Thread.findOne({ title: req.body.title })
            .then((thread) => {
            if (thread == undefined){
                const thread = new Thread({
                    "title": req.body.title,
                    "content": req.body.content,
                    "author": user,
                    "upVotes": 0,
                    "downVotes": 0
                })
                user.threads.push(thread)
                thread.save()
                Promise.all([user.save(), thread.save])
                .then(() => res.status(200).send({Message: "Thread created succesfully"}))
                .catch((error) => res.status(401).json(error));
            } else {
                res.status(422).send({ Error :'Threadtitle already in use.'});
            }
            });
        }
    });
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