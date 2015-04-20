var util = require("util");
var IBasic = require("./IBasic");

var IEnumEntry = function(parent,name) {
  IBasic.IBasic.call(this,parent,name);
  var me = this;
  me.typeName = 'IEnumeration';
}

util.inherits(IEnumEntry, IBasic.IBasic);



exports.FNNAMES = IBasic.FNNAMES.concat([

]);

exports.IEnumEntry = IEnumEntry;
