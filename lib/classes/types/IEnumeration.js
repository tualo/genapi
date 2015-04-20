var util = require("util");
var IBasic = require("./IBasic");

var IEnumeration = function(parent,name) {
  IBasic.IBasic.call(this,parent,name);
  var me = this;
  me.typeName = 'IEnumeration';
  me.entries = {};
  me.value;
}

util.inherits(IEnumeration, IBasic.IBasic);

IEnumeration.prototype.addEnumEntry = function(name,obj){
  var me = this;
  me.entries[name] = obj;
}

IEnumeration.prototype.setValue = function(name){
  var me = this;
  if (typeof me.entries[name] === 'object'){
    me.value = me.entries[name].getValue();
    me.emit('value',me.value);
  }
}

exports.FNNAMES = IBasic.FNNAMES.concat([

]);

exports.IEnumeration = IEnumeration;
