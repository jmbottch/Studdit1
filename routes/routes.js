const UserController = require('../src/controllers/user_controller');
const ThreadController = require('../src/controllers/thread_controller');
const CommentController = require('../src/controllers/comment_controller');

module.exports = (app) => {

    // Create new user
    app.post('/api/user', UserController.create);

    // Change user password
    app.put('/api/user/:username', UserController.edit);

    // Set user to inactive
    app.delete('/api/user/:username', UserController.delete);

    // Create new thread
    app.post('/api/thread', ThreadController.create);

    // Edit thread content
    app.put('/api/thread/:title', ThreadController.edit);

    // Delete thread
    app.delete('/api/thread/:title', ThreadController.delete);

    // Post new comment in thread
    app.post('/api/thread/comment', CommentController.create);
    
    // Post new subcomment in existing comment
    app.post('/api/comment', CommentController.createSubComment);

    // Edit comment
    app.put('/api/comment/edit', CommentController.edit);

    // Delete comment
    app.delete('/api/comment/delete', CommentController.delete);
};