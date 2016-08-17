exports.set = function(module)
{
    module.Version           = "1.0";
    module.Codes             = require('./codeList.js');
    module.HandShake         = require('./handShake.js');
    module.HandShakeResponse = require('./handShakeResponse.js');
    module.Login             = require('./login.js');
    module.LoginResponse     = require('./loginResponse.js');
    module.Log               = require('./log.js');
}
