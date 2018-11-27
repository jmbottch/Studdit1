const mongoose = require('mongoose');
const Thread = require('./thread');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        validate: {
            validator: (username) => username.length > 5,
            message: 'Username must be longer than five characters.'
        },
        required: [true, 'Username is required.']
    },
    password: {
        type: String,
    validate: {
        validator: (password) => password.length > 6,
        message: 'Password must be at least seven characters'
    },
        required:[true, 'Password is required.']    
    },
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
