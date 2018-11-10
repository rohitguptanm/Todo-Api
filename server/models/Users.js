var mongoose = require('mongoose');

var Users = mongoose.model('Users', {
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15,
        trim: true
    }
});

module.exports = {Users};