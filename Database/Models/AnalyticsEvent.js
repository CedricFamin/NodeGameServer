var mongoose = require('mongoose');

var logSchema = new mongoose.Schema({
    origin: { type:String, required: true},
    type: { type: String, required: true },
    content: { type: Buffer, required: true},
},
{
    timestamps: true
});

LogModel = mongoose.model('LogModel', logSchema);

exports.AnalyticsEvent = LogModel
