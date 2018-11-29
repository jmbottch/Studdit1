const User = require('../models/user');
const MongoClient = require('mongodb').MongoClient

module.exports = {

    test(req, res) {
        res.send({
            test: 'succes'
        });
        console.log('succes bitch');
    },

    createUser(req, res) {
        const userProps = req.body;
        const user = new User(userProps);

        MongoClient.connect('mongodb://admin:admin123@ds151631.mlab.com:51631/studditmongo', (err, db) => {
            var dbase = db.db("studditmongo");
            if (err) return console.log(err)

            // Checks if username is already taken
            if (dbase.collection("user").countDocuments({
                    username: user.username
                })
                .then((count) => {
                    // If the username is already taken
                    if (count > 0) {
                        res.send('Username already taken');
                    }
                    // If the username is not already taken
                    else {
                        // Save the user to the database
                        dbase.collection("user").insertOne(user, (err, result) => {
                            if (err) {
                                console.log(err);
                            }
                            res.send('User added successfully');
                        });
                    }
                }));
        });
    },

    editUser(req, res, next) {
        const userId = req.params.id;
        const userProps = req.body;

        MongoClient.connect('mongodb://admin:admin123@ds151631.mlab.com:51631/studditmongo', (err, db) => {
            var dbase = db.db("studditmongo");
            if (err) return console.log(err)

            dbase.collection("user").findByIdAndUpdate({ _id: userId }, userProps);
        });
    },

    deleteUser(req, res, next) {
        const userId = req.params.id;
        const userProps = req.body;

        User.findByIdAndRemove({
                _id: userId
            })
            .then(user => res.status(204).send(user))
            .catch(next);
    }
};