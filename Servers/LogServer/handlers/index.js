var handShake = require("./handShake.js");
var logs = require("./logs.js");

module.exports.set = function(srv)
{
    handShake.set(srv);
    logs.set(srv);
}
