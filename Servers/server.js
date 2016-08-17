var logs         = require('../Clients/LogClient/LogClient.js');
var packetReader = require('../Protocol/reader.js');
var protocol     = require('../Protocol/protocol.js');
var dgram        = require('dgram');

function server(port)
{
    this._port         = port;
    this._logs         = new logs.Client("Connection Server", "127.0.0.1", 8082);
    this._socket       = dgram.createSocket('udp4');
    this._packetReader = new packetReader.Reader("1.0");
    this._database     = require('../Database/Init.js');
}

server.prototype.packetReader = function()
{
    return this._packetReader;
}

server.prototype.database = function()
{
    return this._database;
}

server.prototype.log  = function()
{
    return this._logs;
}

server.prototype.init = function()
{
    this._socket.on('error', (err) => { console.log(`Server error:\n${err.stack}`); this._socket.close(); });
    this._socket.on('listening', () => { });
    this._socket.on('message', (msg, rinfo) =>
    {
        var packet = new protocol.Packet(msg);
        this._packetReader.read(packet, rinfo);
    });
}

server.prototype.launch = function()
{
    this._socket.bind(this._port);
}

server.prototype.send = function(data, port, addr)
{
    this._socket.send(data, port, addr);
}

module.exports.udp = server
