var util = require("util");
var IBasicNumber = require("./IBasicNumber");

var IInteger = function(parent,name) {
  var me = this;
  me.typeName = 'IInteger';
  IBasicNumber.IBasicNumber.call(this,parent,name);
}

util.inherits(IInteger, IBasicNumber.IBasicNumber);


IInteger.prototype.setInc = function(value){
  var me = this;
  me.inc = value;
  me.emit('inc',value);
}
IInteger.prototype.setPInc = function(value){
  var me = this;
  me.parent.get(value,function(pvalue){
    pvalue.on('value',function(value){
      me.setInc(value);
    });
  });
}


exports.FNNAMES = IBasicNumber.FNNAMES.concat([
  'Inc'
]);

exports.IInteger = IInteger;
