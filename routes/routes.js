const UserController = require('../src/controllers/user_controller');
const ThreadController = require('../src/controllers/thread_controller');
const CommentController = require('../src/controllers/comment_controller');

module.exports = (app) => {

    app.post('/api/user', UserController.create);
    app.put('/api/user/:username', UserController.edit);
    app.delete('/api/user/:username', UserController.delete);

    app.post('/api/thread', ThreadController.create);
    app.put('/api/thread/:title', ThreadController.edit);
    app.delete('/api/thread/:title', ThreadController.delete);

    app.post('/api/comment', CommentController.create);
    app.put('/api/comment/:id', CommentController.edit);
    app.delete('/api/comment/:id', CommentController.delete);
};