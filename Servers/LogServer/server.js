var server   = require("../server.js");
var handlers = require('./handlers');
var Discover = require("node-discover");

var srv = new server.udp(8082);
srv.log = function(data)
{
    console.log(`[${data.type} (${data.origin}) ${data.content}`);
    var event = new this._database.Models.AnalyticsEvent(data);
    event.save(function(err)
    {
        if (err)
        {
            console.log(err);
        }
    });
}
srv.init();
handlers.set(srv);
srv.launch();

var d = new Discover({ key : "MMSRV", advertisement:"Logging" });
