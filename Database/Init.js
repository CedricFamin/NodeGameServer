var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/RollYourLife');

exports.Models = require('./Models/Models.js')
