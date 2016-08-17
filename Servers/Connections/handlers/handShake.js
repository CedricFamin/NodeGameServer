var protocol     = require('../../../Protocol/protocol.js');

module.exports.set = function(srv)
{
    srv.packetReader().handle("handShake", function(version, rinfo)
    {
        var resCode = protocol.Codes.Status.KO;
        if (version == protocol.Version)
        {
            resCode = protocol.Codes.Status.OK;
        }
        var response = protocol.HandShakeResponse.Create(resCode);
        srv.send(response.Buffer(), rinfo.port, rinfo.address);
    });
}
