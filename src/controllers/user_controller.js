const User = require('../models/user');

module.exports = {

    create(req, res, next) {
        const userProps = req.body;

        User.create(userProps)
            .then(user => res.status(201).send({ Message: 'User created' }))
            .catch(next)
    },

    edit(req, res, next) {
        const username = req.body.username;
        const password = req.body.password;
        const newPassword = req.body.newPassword;

        User.findOne({
                username: username
            })
            .then(user => {
                if (user === null) {
                    res.status(422).send({
                        Error: 'User does not exist.'
                    })
                }
                if (user.password !== password) {
                    res.status(400).send({
                        Error: 'User password does not match.'
                    })
                } else {
                    user.set('password', newPassword)
                    user.save()
                        .then(user => res.status(200).send({
                            Message: 'Password updated succesfully'
                        }))
                }
            })
            .catch(next);
    },

    delete(req, res, next) {
        const username = req.body.username;

        User.findOne({
                username: username
            })
            .then(user => {
                if (user === null) {
                    res.status(422).send({
                        Error: 'User does not exist.'
                    })
                } else {
                    user.set('active', false)
                    user.save()
                        .then(user => res.status(200).send({
                            Message: 'User set to inactive'
                        }))
                }
            })
            .catch(next);
    }
};