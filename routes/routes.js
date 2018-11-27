const UsersController = require('../src/controllers/user_controller');

module.exports = (app) => {

    app.post('/api/users', UsersController.create);
    app.put('/api/users/:id', UsersController.edit);
    app.delete('/api/users/:id', UsersController.delete);

};