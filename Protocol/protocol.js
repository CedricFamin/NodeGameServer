"use strict";

var assert      = require("assert");
var bson        = require('bson');
var SmartBuffer = require('smart-buffer');
var BSON        = new bson.BSONPure.BSON();

function Packet(code)
{
    if (Buffer.isBuffer(code))
    {
        this._writable   = false;
        this._buffer     = new SmartBuffer(code);
    }
    else
    {
        this._writable   = true;
        this._buffer     = new SmartBuffer();
        this._buffer.writeInt8(code);
    }
}

Packet.prototype.Buffer = function()
{
    return this._buffer.toBuffer();
}

Packet.prototype.WriteObject = function(object)
{
    assert(false);
    assert(this._writable);
    //var objectBSON = BSON.serialize(object, true, true);
    //this._buffer = Buffer.concat([this._buffer, objectBSON]);
}

Packet.prototype.WriteString = function(str)
{
    assert(this._writable);
    this._buffer.writeStringNT(str);
}

Packet.prototype.WriteCode = function(code)
{
    assert(this._writable);
    this._buffer.writeInt8(code);
}

Packet.prototype.ReadCode = function()
{
    assert(!this._writable);
    var value = this._buffer.readInt8();
    return value;
}

Packet.prototype.ReadString = function()
{
    assert(!this._writable);
    return this._buffer.readStringNT();
}

exports.Packet = Packet;
require("./1.0").set(exports);
