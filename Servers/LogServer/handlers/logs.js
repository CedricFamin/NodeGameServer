var protocol     = require('../../../Protocol/protocol.js');

module.exports.set = function(srv)
{
    srv.packetReader().handle("log", function(data, rinfo)
    {
        data['origin'] = rinfo.address + ":" + rinfo.port;
        srv.log(data);
    });
}
