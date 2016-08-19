var logs         = require('../Clients/LogClient/LogClient.js');
var packetReader = require('../Protocol/reader.js');
var protocol     = require('../Protocol/protocol.js');
var dgram        = require('dgram');

class udp
{
    constructor(port)
    {
        this._port         = port;
        this._logs         = new logs.Client("Connection Server", "127.0.0.1", 8082);
        this._socket       = dgram.createSocket('udp4');
        this._packetReader = new packetReader.Reader("1.0");
        this._database     = require('../Database/Init.js');
    }

    packetReader() { return this._packetReader; }
    database() { return this._database; }
    log() { return this._logs; }
    launch() { this._socket.bind(this._port); }
    send(data, port, addr) { this._socket.send(data, port, addr); }

    init()
    {
        this._socket.on('error', (err) => { console.log(`Server error:\n${err.stack}`); this._socket.close(); });
        this._socket.on('listening', () => { });
        this._socket.on('message', (msg, rinfo) =>
        {
            var packet = new protocol.Packet(msg);
            this._packetReader.read(packet, rinfo);
        });
    }
}
class tcp
{
    constructor(port)
    {
        const net = require('net');
        this._port         = port;
        this._logs         = new logs.Client("Connection Server", "127.0.0.1", 8082);
        this._server       = net.createServer((c) =>
        {
          console.log('client connected');
          this.register(c);

          c.on('data', (data) => {
              var packet = new protocol.Packet(msg);
              var rinfo = {};
              rinfo.port = c.localPort;
              rinfo.address = c.localAddress;
              this._packetReader.read(packet, rinfo);
          });

          c.on('end', () => {
              this.unregister(c);
              console.log('client disconnected');
          });

          c.on('error', () => {
              this.unregister(c);
              console.log('client disconnected');
          });
        });

        this._packetReader = new packetReader.Reader("1.0");
        this._database     = require('../Database/Init.js');
        this._clients      = {}
    }

    init() { }
    packetReader() { return this._packetReader; }
    database() { return this._database; }
    log() { return this._logs; }
    launch() { this._server.listen(this._port); }
    send(data, port, addr) { this.retrieveSocket({localAddress:addr, localPort:port}).write(data); }
    buildSocketKey(socket) { return socket.localAddress + ":" + socket.localPort; }
    register(socket) { this._client[this.buildSocketKey(socket)] = socket; }
    unregister(socket) { this._client[this.buildSocketKey(socket)] = null; }
    retrieveSocket(socket) { return this._client[this.buildSocketKey(socket)]; }
}


module.exports.udp = udp
module.exports.tcp = tcp;
