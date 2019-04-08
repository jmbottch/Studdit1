const UserController = require('../src/controllers/user_controller');
const ThreadController = require('../src/controllers/thread_controller');
const CommentController = require('../src/controllers/comment_controller');

module.exports = (app) => {
    // Create new user
    app.post('/api/user', UserController.create);

    // Fetch user based on username
    app.get('/api/user/:username', UserController.fetch)

    // fetch list of all users
    app.get('/api/users', UserController.findall)

    // Change user password
    app.put('/api/user/:username', UserController.edit);

    // Set user to inactive
    app.delete('/api/user', UserController.delete);

    // Add friendship between users
    app.post('/api/user/addfriend', UserController.addFriend);
    
    // Delete friendship between users
    app.delete('/api/user/deletefriend', UserController.deleteFriend);
    
    //list of threads
    app.get('/api/threads', ThreadController.findall);

    // single thread
    app.get('/api/thread/:id', ThreadController.single);

    // Create new thread
    app.post('/api/thread', ThreadController.create);

    // Edit thread content
    app.put('/api/thread', ThreadController.edit);

    // Delete thread
    app.put('/api/thread/delete', ThreadController.delete);

    // Post new comment in thread
    app.post('/api/thread/comment', CommentController.create);

    //a list of all comments
    app.get('/api/comments', CommentController.findall)
    
    // Edit comment
    app.put('/api/comment', CommentController.edit);

    //fetch single comment
    app.get('/api/comment/:id', CommentController.single) 

    // Delete comment
    app.put('/api/comment/delete', CommentController.delete);

};
