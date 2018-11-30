const User = require('../models/user');
module.exports = {


    create(req, res, next) {
        const userProps = req.body;

        User.create(userProps)
            .then(user => res.status(201).send({ Message: 'User created' }))
            .catch(next)
    },

    fetch(req, res, next) {
        const username = req.params.username;

        User.findOne({
                username: username
            })
            .then(user => {
                if (user === null) {
                    res.status(422).send({
                        Error: 'User does not exist.'
                    })
                } else {
                    res.status(200).send(user);
                }
            })
            .catch(next);
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
    },

    addFriend(req, res, next){
        const username1 = req.body.usernameA;
        const username2 = req.body.usernameB;
        const session = driver.session();

        const resultAddFriend = session.run(
            'MATCH (a:User {username: $username1}) ' +
            'MATCH (b:User {username: $username2}) ' +
            'MERGE (a)-[:FRIENDs]->(b)',
            {username1: username1, nausername2: username2}
        );

        resultAddFriend.then(result => {
            session.close();
            driver.close();
        });

        console.log('Friend has been added successfully!')
    },

    deleteFriend(req, res, next){
        const username1 = req.body.usernameA;
        const username2 = req.body.usernameB;
        const session = driver.session();

        const resultDeleteFriend = session.run(
            'MATCH(a:User)-[r:FRIENDs]-(b:User)' +
            'WHERE a.username = $username1 AND b.username = $username2 ' +
            'DELETE r ' +
            'RETURN a, b',
            {username1: username1, username2: username2}

        );

        resultDeleteFriend.then(result => {
            session.close();
            driver.close();
            res.send(result)
        })
        .catch(err => {
            res.status(400).send({Error: 'Error while deleting friendship.'})
        })

        console.log('Friends deleted!')




    },
};
