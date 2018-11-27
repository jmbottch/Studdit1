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
        ref: 'user'
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }],
    votes: {
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }
});

const Thread = mongoose.model('thread', ThreadSchema)

module.exports = Thread;
