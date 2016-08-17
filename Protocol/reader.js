function Reader(protocolVersion)
{
    this._handlers = {};
    this._version  = protocolVersion;
}

Reader.prototype.handler = function(code, callback)
{
    this._handlers[code] = callback;
}

Reader.prototype.handle = function(actionName, callback)
{
    var action = require("./" + this._version + "/" + actionName + ".js");
    this._handlers[action.Code] = action.Receive(callback);
}

Reader.prototype.read = function(packet, arg)
{
    var code = packet.ReadCode();
    if (this._handlers[code] === undefined)
    {
        console.log("[WARNING] Cannot handle code: " + code);
        return false;
    }
    this._handlers[code](packet, arg);
    return true;
}

exports.Reader = Reader
