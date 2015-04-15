var util = require("util");
var IBasicNumber = require("./IBasicNumber");

var IBoolean = function(parent,name) {
  var me = this;
  me.typeName = 'IBoolean';
  IBasicNumber.IBasicNumber.call(this,parent,name);
}

util.inherits(IBoolean, IBasicNumber.IBasicNumber);


IBoolean.prototype.setOnValue = function(value){
  var me = this;
  me.onValue = value;
  me.emit('onValue',value);
}
IBoolean.prototype.setPOnValue = function(value){
  var me = this;
  me.parent.get(value,function(pvalue){
    pvalue.on('value',function(value){
      me.setOnValue(value);
    });
  });
}

IBoolean.prototype.setOffValue = function(value){
  var me = this;
  me.offValue = value;
  me.emit('offValue',value);
}
IBoolean.prototype.setPOffValue = function(value){
  var me = this;
  me.parent.get(value,function(pvalue){
    pvalue.on('value',function(value){
      me.setOffValue(value);
    });
  });
}

exports.FNNAMES = IBasicNumber.FNNAMES.concat([
  'OnValue',
  'OffValue'
]);

exports.IBoolean = IBoolean;
