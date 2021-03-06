const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: String,
    votes: {
        type: Number,
        default: 0
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;
