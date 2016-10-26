var assert   = require("assert");
var protocol = require('../protocol.js');
var codes    = require('./codeList.js');

function CreatePacket(serverKind, port)
{
    var packet = new protocol.Packet(codes.Client.HELLO);
    packet.WriteInt(serverKind);
    packet.WriteInt(port)
    return packet;
}

function ReadPacket(callback)
{
    return function(packet, arg)
    {
        var serverKind = packet.ReadInt();
        var port = packet.ReadInt();
        callback(serverKind, port);
    }
}

exports.Create  = CreatePacket;
exports.Receive = ReadPacket;
exports.Code    = codes.Client.HELLO;
