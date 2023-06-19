const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: true,
        unique: true
      },
    name: String,
    passwordHash: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog',
        }
    ],
})

userSchema.path('username').validate({
    validator: function(v) {return v.length >= 3},
    message: function(props) {
        return `${props.path} expected username length equil at least 3 '${props.value}'`;
      }
})

userSchema.set('toJSON', {
    transform: (document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

userSchema.plugin(uniqueValidator);
const User = mongoose.model('User', userSchema);
module.exports = User;