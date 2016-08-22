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

// Low memory warning monitor
require('monitor').start();
var Monitor = require('monitor');
var LOW_MEMORY_THRESHOLD = 4800000000;

// Set the probe to push changes every 10 seconds
var options = {
  hostName: 'localhost',
  probeClass: 'Process',
  initParams: {
    pollInterval: 10
  }
}
var processMonitor = new Monitor(options);

var freemem = processMonitor.get('freemem');
console.log('Low memory warning: ' + freemem);

// Now connect the monitor
processMonitor.connect(function(error) {
  if (error) {
    console.error('Error connecting with the process probe: ', error);
    process.exit(1);
  }
});
