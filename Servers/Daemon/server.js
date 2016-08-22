var Spawn    = require('child_process').spawn;
var Discover = require("node-discover");
var Server   = require("../server.js");
var Handlers = require('./handlers');

var d = new Discover({ key : "MMSRV", advertisement:"Daemon" });

class DeamonServer extends Server.tcp
{
    constructor(port)
    {
        super(port);
    }

    SpawnServer(serverName, port)
    {
        Spawn("node", ["../" + serverName + "/server.js",  port], {cwd:"../" + serverName});
    }
}

var srv = new DeamonServer(4242);
srv.init();
Handlers.set(srv);
srv.launch();

var monitor = require("../../uptime/monitor");
