var util = require("util");
var ISwissKnife = require("./ISwissKnife");

var IIntSwissKnife = function(parent,name) {
  var me = this;
  me.typeName = 'IIntSwissKnife';
  ISwissKnife.ISwissKnife.call(this,parent,name);
}

util.inherits(IIntSwissKnife, ISwissKnife.ISwissKnife);


exports.FNNAMES = ISwissKnife.FNNAMES.concat([
  
]);

exports.IIntSwissKnife = IIntSwissKnife;
