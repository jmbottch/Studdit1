const User = require('../models/user');
const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver('bolt://hobby-ccflbaaccbcogbkemkneffbl.dbs.graphenedb.com:24786', 
neo4j.auth.basic('jeroen', 'b.m1mQSF3xsOsB.5LbY3TnSpyUejZ6B'));

module.exports ={
    findall(req, res) {
        User.find({})
        .then(users => {
            res.status(200).send(users)
        })
    },
    create(req, res){
        const username = req.body.username;
        const session = driver.session();
        const resultAdd = session.run(
            'CREATE (a:User {username: $username}) RETURN a',
            {username: username}
        );
        User.create({
            username: req.body.username,
            password: req.body.password,
            active: true,
            threads:[]
        }).then (() => {
            res.status(200).send({Message:'User created successfully.'}),
            resultAdd.then(result => {
                session.close();
                driver.close();
            })
            .catch((err) => {
                if(err.username === 'MongoError' && err.code === 11000){
                    res.status(401).send({Error: 'username is already taken.'})
                }
            })
        })
    },

    addFriend(req,res,next){
        const username1 = req.body.usernameA;
        const username2 = req.body.usernameB;
        const session = driver.session();

        const resultAddFriend = session.run(
            'MATCH (a:User {username: $username1}) ' +
            'MATCH (b:User {username: $username2}) ' +
            'MERGE (a)-[:FRIEND]->(b)',
            {username1: username1, username2: username2} 
        ).then(() => {
            res.status(200).send({Message:'Friendship created successfully.'})
        });
        resultAddFriend.then(() => {
            session.close();
            driver.close();
        }).catch(err => {
            res.status(401).send({Error: 'There was an issue adding a friendship'})
        });
        

        
    },

    deleteFriend(req, res, next) {
        const username1 = req.body.usernameA;
        const username2 = req.body.usernameB;
        const session = driver.session();

        const resultDeleteFriend = session.run(
            'MATCH(a:User)-[r:FRIEND]-(b:User)' +
            'WHERE a.username = $username1 AND b.username = $username2 ' +
            'DELETE r ' +
            'RETURN a, b',
            {username1: username1, username2: username2}
        ).then(() => {
            res.status(200).send({Message:'Friendship removed succesfully'})
        });

        resultDeleteFriend.then(result => {
            session.close();
            driver.close();
            res.send(result);
        })
        .catch(err => {
            res.status(400).send({Error: 'Error while deleting friendship'})
        });
        console.log('Friendship deleted')
    },
    fetch(req, res, next) {
        User.findOne({
                _id: req.body._id
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

    edit(req, res) {
        User.findOne({_id: req.body._id})
        .then(user => {
            if(user === null) {
                res.status(401).send({Error: 'User does not exist.'});
                console.log("user does not exist")
            }else {
                console.log(user);
                let passwordToSet = req.body.password;               
                if(req.body.password === '' || req.body.password === null)passwordToSet = user.password;
                user.set({                 
                    password: passwordToSet
                });
                user.save()
                .then(() => {
                    res.status(200).send({Message: 'Password changed'})
                })
                .catch((err) => {
                    res.status(401).send({err})
                })
            }
        })
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
                    user.set('active', false);
                    user.save()
                        .then(user => res.status(200).send({
                            Message: 'User set to inactive'
                        }))
                }
            })
            .catch((err) => {
                res.status(401).send({Error: "something went wrong"});
                console.log(err)
            });
    }
};

