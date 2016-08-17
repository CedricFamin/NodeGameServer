var assert   = require("assert");
var protocol = require('../protocol.js');
var codes    = require('./codeList.js');

function CreatePacket(code)
{
    var packet = new protocol.Packet(codes.Server.LOGIN_RESPONSE);
    packet.WriteCode(code);
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
exports.Code    = codes.Server.LOGIN_RESPONSE;
