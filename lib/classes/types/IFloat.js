var util = require("util");
var IBasicNumber = require("./IBasicNumber");

var IFloat = function(parent,name) {
  IBasicNumber.IBasicNumber.call(this,parent,name);
  var me = this;
  me.typeName = 'IFloat';
}

util.inherits(IFloat, IBasicNumber.IBasicNumber);


IFloat.prototype.setUnit = function(value){
  var me = this;
  me.unit = value;
  me.emit('unit',value);
}
IFloat.prototype.setPUnit = function(value){
  var me = this;
  me.parent.get(value,function(pvalue){
    pvalue.on('value',function(value){
      me.setUnit(value);
    });
  });
}

exports.FNNAMES = IBasicNumber.FNNAMES.concat([
  'Unit'
]);

exports.IFloat = IFloat;
