const UserController = require('../src/controllers/user_controller');
const ThreadController = require('../src/controllers/thread_controller');

module.exports = (app) => {

    app.post('/api/user', UserController.create);
    app.put('/api/user/:username', UserController.edit);
    app.delete('/api/user/:username', UserController.delete);

    app.post('/api/thread', ThreadController.create);
    app.put('/api/thread/:title', ThreadController.edit);
    app.delete('/api/thread/:title', ThreadController.delete);

    // app.post('/api/comment', UsersController.createUser);
    // app.put('/api/comment/:id', UsersController.editUser);
    // app.delete('/api/comment/:id', UsersController.deleteUser);
};