var assert   = require("assert");
var protocol = require('../protocol.js');
var codes    = require('./codeList.js');

function CreatePacket(login, password)
{
    var packet = new protocol.Packet(codes.Client.LOGIN);
    packet.WriteString(login);
    packet.WriteString(password);
    return packet;
}

function ReadPacket(callback)
{
    return function(packet, arg)
    {
        var login = packet.ReadString();
        var password = packet.ReadString();
        callback(login, password, arg);
    }
}

exports.Create  = CreatePacket;
exports.Receive = ReadPacket
exports.Code    = codes.Client.LOGIN;
