const User = require('../models/user');

module.exports = {

    test(req, res) {
        res.send({
            test: 'succes'
        });
    },

    create(req, res, next) {
        const userProps = req.body;

        User.create(userProps)
            .then(user => res.send(user))
            .catch(next)
    },

    edit(req, res, next) {
        console.log(req.body);
        
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
                    res.status(401).send({
                        Error: 'User password does not match.'
                    })
                } else {
                    user.set('password', newPassword)
                    user.save()
                    then(user => res.status(200).send({
                        Message: 'Password updated succesfully'
                    }))
                }
            })
            .catch(next);
    },

    deleteUser(req, res, next) {
        const userId = req.params.id;

        
    }
};