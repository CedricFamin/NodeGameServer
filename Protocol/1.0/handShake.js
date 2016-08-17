var assert   = require("assert");
var protocol = require('../protocol.js');
var codes    = require('./codeList.js');

function CreatePacket()
{
    var packet = new protocol.Packet(codes.Client.HANDSHAKE);
    packet.WriteString(protocol.Version);
    return packet;
}

function ReadPacket(callback)
{
    return function(packet, arg)
    {
        var version = packet.ReadString();
        callback(version, arg);
    }
}

exports.Create  = CreatePacket;
exports.Receive = ReadPacket
exports.Code    = codes.Client.HANDSHAKE;
