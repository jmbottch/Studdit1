const mongoose = require('mongoose');
const Thread = require('./thread');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
    threads: [{
        type: Schema.Types.ObjectId,
        ref: 'thread'
    }]
});

UserSchema.virtual('threadCount').get(function(){
    return this.threads.length;
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
