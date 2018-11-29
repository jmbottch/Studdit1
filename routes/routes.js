const UsersController = require('../src/controllers/user_controller');

module.exports = (app) => {
    
    app.get('/api/test', UsersController.test);

    //app.post('/api/users', UsersController.create);
    app.put('/api/user/:username', UsersController.edit);
    app.delete('/api/user/:id', UsersController.deleteUser);

    // app.post('/api/thread', UsersController.createUser);
    // app.put('/api/thread/:id', UsersController.editUser);
    // app.delete('/api/thread/:id', UsersController.deleteUser);

    // app.post('/api/comment', UsersController.createUser);
    // app.put('/api/comment/:id', UsersController.editUser);
    // app.delete('/api/comment/:id', UsersController.deleteUser);
};