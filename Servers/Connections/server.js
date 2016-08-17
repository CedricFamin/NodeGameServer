var server   = require("../server.js");
var handlers = require('./handlers');

var srv = new server.udp(8081);
srv.init();
handlers.set(srv);
srv.launch();
