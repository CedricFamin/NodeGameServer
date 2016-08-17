var dgram     = require('dgram');
var handshake = require('../../Protocol/1.0/handShake.js');

function LogClient(name, address, port)
{
    this._socket  = dgram.createSocket('udp4');
    this._name    = name;
    this._address = address;
    this._port    = port;

    //this.send("New client", name);

    var handShakePacket = handshake.Create();
    this._socket.send(handShakePacket.Buffer(), this._port, this._address);
}

LogClient.prototype.constructor = function()
{

}

LogClient.prototype.send = function(kind, data)
{
    var packetContent = new Buffer(JSON.stringify({ type: kind, content:data}));
    this._socket.send(packetContent, this._port, this._address);
};

module.exports.Client = LogClient;
