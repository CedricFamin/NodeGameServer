var Spawn    = require('child_process').spawn;
var Discover = require("node-discover");
var Server   = require("../server.js");
var Handlers = require('./handlers');
var protocol = require("../../Protocol/protocol.js");
var request  = require('request');

var helloPacket = protocol.Hello.Create(protocol.Codes.Server.DAEMON, 4242);
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


var serverName = require("os").hostname() + " - Deamon";
var monitor = require("../../uptime/monitor");

request({
   method: 'GET',
   url: "http://127.0.0.1:8082/api/checks",
}, function(error, rqst, body)
{
    if (!error)
    {
        var checkAlreadyExist = false;
        var checks = JSON.parse(body);
        for (idx in checks)
        {
            var check = checks[idx];
            if (check.name == serverName)
            {
                checkAlreadyExist = true;
                break
            }
        }
        if (!checkAlreadyExist)
        {
            request(
                {
                   method: 'PUT',
                   url: "http://127.0.0.1:8082/api/checks",
                   json: {
                       'url':"http://localhost:8082/api",
                       "name":serverName,
                   }
                }, function(error, request, body){
                    console.log(error);
                }
            );
        }
    }
});
