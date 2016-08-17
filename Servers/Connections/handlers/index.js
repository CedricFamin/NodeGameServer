var handShake = require("./handShake.js");
var login = require("./login.js");

module.exports.set = function(srv)
{
    handShake.set(srv);
    login.set(srv);
}
