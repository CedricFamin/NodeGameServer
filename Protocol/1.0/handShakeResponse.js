var assert   = require("assert");
var protocol = require('../protocol.js');
var codes    = require('./codeList.js');

function CreatePacket(response)
{
    var packet = new protocol.Packet(codes.Server.HANDSHAKE_RESPONSE);
    packet.WriteCode(response);
    return packet;
}

function ReadPacket(callback)
{
    return function(packet, arg)
    {
        var response = packet.ReadCode();
        callback(response, arg);
    }
}

exports.Create  = CreatePacket;
exports.Receive = ReadPacket;
exports.Code    = codes.Server.HANDSHAKE_RESPONSE;
