var util = require("util");
var IBasic = require("./IBasic");

var IEnumeration = function(parent,name) {
  var me = this;
  me.typeName = 'IEnumeration';
  me.entries = {};
  IBasic.IBasic.call(this,parent,name);
}

util.inherits(IEnumeration, IBasic.IBasic);

IEnumeration.prototype.addEnumEntry = function(name,obj){
  me.entries[name] = obj;
}



exports.FNNAMES = IBasic.FNNAMES.concat([

]);

exports.IEnumeration = IEnumeration;
