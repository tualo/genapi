var util = require("util");
var IBasicNumber = require("./IBasicNumber");

var IBoolean = function(parent,name) {
  IBasicNumber.IBasicNumber.call(this,parent,name);
  var me = this;
  me.typeName = 'IBoolean';
  me.onValue = 1;
  me.offValue = 0;
}

util.inherits(IBoolean, IBasicNumber.IBasicNumber);

IBoolean.prototype.getValue = function(){
  var me = this;
  return me.value === me.onValue;
}

IBoolean.prototype.setValue = function(value){
  var me = this;

  if (value===true){
    me.setRawValue( me.onValue );
  }else{
    me.setRawValue( me.offValue );
  }
}

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
