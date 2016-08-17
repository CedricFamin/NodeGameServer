var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    login:{ type: String, unique: true},
    password: String,
    accessToken: String,
    expirationDate: Date,
},
{
    timestamps: true
});

User = mongoose.model('User', userSchema);

exports.User = User
