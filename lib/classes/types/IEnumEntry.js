var util = require("util");
var IBasic = require("./IBasic");

var IEnumEntry = function(parent,name) {
  IBasic.IBasic.call(this,parent,name);
  var me = this;
  me.typeName = 'IEnumeration';
}

util.inherits(IEnumEntry, IBasic.IBasic);

IEnumEntry.prototype.setValue = function(value){
  var me = this;
  if (typeof value==='string'){

    value = parseInt(value);
    
  }
  me.setRawValue(value);
}

exports.FNNAMES = IBasic.FNNAMES.concat([

]);

exports.IEnumEntry = IEnumEntry;
