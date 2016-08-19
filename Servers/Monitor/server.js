"use-strict"

var Express  = require("express");
var Discover = require("node-discover");

var d = new Discover({
    client: true,
    key: "MMSRV",
});

d.on("added", function (obj)
{
    switch(obj.advertisement)
    {
        case "Connect":
            console.log("New Connection server set up.");
            break;
        case "MatchMaking":
            console.log("New MatchMaking server set up.");
            break;
    }
});

d.on("removed", function (obj) {
	console.log("Node removed from the network.");
});

d.on("error", function (err) {
	console.log("error", err);
});

var app = Express()
app.get('/', function (req, res)
{
    var serverType = {}
    var machine = {}
    d.eachNode(function (node) {
        serverType[node.advertisement] = serverType[node.advertisement] ? serverType[node.advertisement] : [];
        serverType[node.advertisement].push(node);
        machine[node.address] = machine[node.address] ? machine[node.address] : [];
        machine[node.address].push(node);
    });

    var content = "<meta http-equiv=\"refresh\" content=\"5; URL=http://127.0.0.1:3000\">";
    content += 'There is ' + Object.keys(machine).length + ' machine running servers.<br />';
    content += "List of servers by machine : <br />";
    for(key in machine)
    {
        content += " - Machine " + key + " :"
        content += "<ul>"
        for (i in machine[key])
        {
            content += "<li>" + machine[key][i].advertisement + "</li>"
        }
        content += "</ul>"
    }


    res.send(content);
});

app.listen(3000, function () {
    console.log('Monitor listen on port 3000.');
});
