const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
    title: {
        type: String,
        required:[true, 'Title is required.']
    },
    content: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required:[true, 'UserId is required']
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }],
    votes: {
        type: Number,
        default: 0
    }
});

const Thread = mongoose.model('thread', ThreadSchema)

module.exports = Thread;
