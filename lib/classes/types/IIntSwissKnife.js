var util = require("util");
var ISwissKnife = require("./ISwissKnife");

var IIntSwissKnife = function(parent,name) {
  ISwissKnife.ISwissKnife.call(this,parent,name);
  var me = this;
  me.typeName = 'IIntSwissKnife';
}

util.inherits(IIntSwissKnife, ISwissKnife.ISwissKnife);


exports.FNNAMES = ISwissKnife.FNNAMES.concat([

]);

exports.IIntSwissKnife = IIntSwissKnife;
