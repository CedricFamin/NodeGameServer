"use-strict"

var Express  = require("express");
var Discover = require("node-discover");

var d = new Discover({client: true, key: "MMSRV"});

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
