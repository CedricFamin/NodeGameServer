var dgram        = require('dgram');
var handshake    = require('../../Protocol/1.0/handShake.js');
var packetReader = require('../../Protocol/reader.js');
var protocol     = require('../../Protocol/protocol.js');
var socket       = dgram.createSocket('udp4');

var logginServerAddr = "127.0.0.1";
var logginServerPort = 8081;

var PacketReader = new packetReader.Reader("1.0");

function SendHandShake()
{
    var handShakePacket = handshake.Create();
    console.log("\t - Sending handshake ...");
    socket.send(handShakePacket.Buffer(), logginServerPort, logginServerAddr);
}

function SendLogin()
{
    var packet = protocol.Login.Create("pami", "toto")
    console.log("\t - Sending login ...");
    socket.send(packet.Buffer(), logginServerPort, logginServerAddr);
}

PacketReader.handle("HandShakeResponse", function(code)
{
    if (code != protocol.Codes.Status.OK)
    {
        console.log("\t\t- ko");
        socket.close();
        return ;
    }
    console.log("\t\t- ok");
    SendLogin();

});

PacketReader.handle("LoginResponse", function(code)
{
    if (code != protocol.Codes.Status.OK)
    {
        console.log("\t\t- ko");
        socket.close();
        return ;
    }
    console.log("\t\t- ok");
    socket.close();
});

socket.on('error', (err) =>
{
    console.log(`Server error:\n${err.stack}`);
    socket.close();
});

socket.on('message', (msg, rinfo) =>
{
    var packet = new protocol.Packet(msg);
    PacketReader.read(packet);
});

socket.on('listening', () =>
{
    var address = socket.address();
    console.log(`Logging Test Server listening ${address.address}:${address.port}\n`);
    SendHandShake();
});

socket.bind(8090);
