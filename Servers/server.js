var logs         = require('../Clients/LogClient/LogClient.js');
var packetReader = require('../Protocol/reader.js');
var protocol     = require('../Protocol/protocol.js');
var dgram        = require('dgram');

function udp(port)
{
    this._port         = port;
    this._logs         = new logs.Client("Connection Server", "127.0.0.1", 8082);
    this._socket       = dgram.createSocket('udp4');
    this._packetReader = new packetReader.Reader("1.0");
    this._database     = require('../Database/Init.js');
}

udp.prototype.packetReader = function()
{
    return this._packetReader;
}

udp.prototype.database = function()
{
    return this._database;
}

udp.prototype.log  = function()
{
    return this._logs;
}

udp.prototype.init = function()
{
    this._socket.on('error', (err) => { console.log(`Server error:\n${err.stack}`); this._socket.close(); });
    this._socket.on('listening', () => { });
    this._socket.on('message', (msg, rinfo) =>
    {
        var packet = new protocol.Packet(msg);
        this._packetReader.read(packet, rinfo);
    });
}

udp.prototype.launch = function()
{
    this._socket.bind(this._port);
}

udp.prototype.send = function(data, port, addr)
{
    this._socket.send(data, port, addr);
}

module.exports.udp = udp
