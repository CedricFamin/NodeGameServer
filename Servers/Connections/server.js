"use strict";

var server   = require("../server.js");
var handlers = require('./handlers');
var Discover = require("node-discover");

class ConnectionServer extends server.udp
{
    constructor(port)
    {
        super(port);
        this._mmservers = []
    }

    init()
    {
        super.init();
        this.setupMMDiscover();
    }

    setupMMDiscover()
    {
        this._mmserverDiscover = new Discover({ key : "MMSRV", advertisement:"Connect" });
        this._mmserverDiscover.on("added", (obj) =>
        {
            if (obj.advertisement == "MatchMaking")
            {
                console.log("MatchmakingServer added to the network.");
                this._mmservers.push(obj);
            }
        });
        this._mmserverDiscover.on("removed", (obj) =>
        {
        	console.log("Node removed from the network.");
            this._mmservers.every((srv, i, array) =>
            {
                if (obj.id == srv.id)
                {
                    array.splice(i, 1);
                    return false;
                }
                return true;
            });
        });
        this._mmserverDiscover.on("error", (err) =>
        {
        	console.log("error", err);
        });
    }
};

var srv = new ConnectionServer(8081);
srv.init();
handlers.set(srv);
srv.launch();
