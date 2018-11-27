const UsersController = require('../src/controllers/user_controller');

module.exports = (app) => {

    /*
    We moeten nog even zorgen dat dit werkt zodat de functionaliteit van de requests
    naar de user_controller wordt verplaatst en het niet hier staat.

    app.post('/api/users', UsersController.create);
    app.put('/api/users/:id', UsersController.edit);
    app.delete('/api/users/:id', UsersController.delete);
    */

    app.get('/api', (req, res) => {
        res.send({
            test: 'succes'
        });
    });

    app.post('/user/add', (req, res, next) => {
        var user = new User({
            username: req.body.username,
            password: req.body.password,
            threads: [req.body.threads]
        });

        dbase.collection("user").save(user, (err, result) => {
            if (err) {
                console.log(err);

            }
            res.send('User added successfully');
        });
    });

    app.get('/user', (req, res, next) => {
        dbase.collection("user").findOne({
                username: req.header.username
            })
            .then((users) => {
                if (err) {
                    console.log(err);
                }
                res.send(users);
            });
    });
};