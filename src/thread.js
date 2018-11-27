const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
    title: String,
    content: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    votes: Number = 0,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
});

ThreadSchema.virtual('commentCount').get(function(){
    return this.comments.length;
});

const Thread = mongoose.model('thread', ThreadSchema)

module.exports = Thread;
