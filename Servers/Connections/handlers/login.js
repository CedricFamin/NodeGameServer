var protocol     = require('../../../Protocol/protocol.js');
var Guid         = require('Guid');

module.exports.set = function(srv)
{
    srv.packetReader().handle("login", function(username, password, rinfo)
    {
        srv.database().Models.User.findOne({
            login: username,
            password: password
        }, function(err, user)
        {
            var resCode = protocol.Codes.Status.KO;
            if (err || !user)
            {
                var packet = protocol.LoginResponse.Create(resCode);
                srv.send(packet.Buffer(), rinfo.port, rinfo.address);
            }
            else
            {
                srv.log().send("Connect", user.login);
                user.accessToken = Guid.raw();
                user.save(function(err)
                {
                    if  (err)
                    {
                    }
                    else
                    {
                        resCode = protocol.Codes.Status.OK;
                    }
                    var packet = protocol.LoginResponse.Create(resCode);
                    srv.send(packet.Buffer(), rinfo.port, rinfo.address);
                });
            }
        });
    });
}
