var assert   = require("assert");
var protocol = require('../protocol.js');
var codes    = require('./codeList.js');

function CreatePacket(kind, data)
{
    var packetContent = JSON.stringify({ type: kind, content:data});
    var packet = new protocol.Packet(codes.Client.LOG);
    packet.WriteString(packetContent);
    return packet;
}

function ReadPacket(callback)
{
    return function(packet, arg)
    {
        var packetContent = packet.ReadString();
        callback(JSON.parse(packetContent), arg);
    }
}

exports.Create  = CreatePacket;
exports.Receive = ReadPacket
exports.Code    = codes.Client.LOG;
