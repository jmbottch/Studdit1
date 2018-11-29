const UsersController = require('../src/controllers/user_controller');

module.exports = (app) => {

    app.post('/api/users', UsersController.createUser);
    app.put('/api/users/:id', UsersController.editUser);
    app.delete('/api/users/:id', UsersController.deleteUser);
    app.get('/api/test', UsersController.test);

    // app.post('/user/add', (req, res, next) => {
    //     var user = new User({
    //         username: req.body.username,
    //         password: req.body.password,
    //         threads: [req.body.threads]
    //     });

    //     dbase.collection("user").save(user, (err, result) => {
    //         if (err) {
    //             console.log(err);

    //         }
    //         res.send('User added successfully');
    //     });
    // });

    // app.get('/user', (req, res, next) => {
    //     dbase.collection("user").findOne({
    //             username: req.header.username
    //         })
    //         .then((users) => {
    //             if (err) {
    //                 console.log(err);
    //             }
    //             res.send(users);
    //         });
    // });
};