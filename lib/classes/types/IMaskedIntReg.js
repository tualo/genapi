var util = require("util");
var IIntReg = require("./IIntReg");

var IMaskedIntReg = function(parent,name) {
  var me = this;
  me.typeName = 'IMaskedIntReg';
  IIntReg.IIntReg.call(this,parent,name);
}

util.inherits(IIntReg, IIntReg.IIntReg);



IMaskedIntReg.prototype.setLSB = function(value){
  var me = this;
  me.lsb = value;
  me.emit('lsb',value);
}
IMaskedIntReg.prototype.setPLSB = function(value){
  var me = this;
  me.parent.get(value,function(pvalue){
    pvalue.on('value',function(value){
      me.setLSB(value);
    });
  });
}


IMaskedIntReg.prototype.setMSB = function(value){
  var me = this;
  me.msb = value;
  me.emit('msb',value);
}
IMaskedIntReg.prototype.setPMSB = function(value){
  var me = this;
  me.parent.get(value,function(pvalue){
    pvalue.on('value',function(value){
      me.setMSB(value);
    });
  });
}



IMaskedIntReg.prototype.setBit = function(value){
  var me = this;
  me.bit = value;
  me.emit('bit',value);
}
IMaskedIntReg.prototype.setPBit = function(value){
  var me = this;
  me.parent.get(value,function(pvalue){
    pvalue.on('value',function(value){
      me.setBit(value);
    });
  });
}



exports.FNNAMES = IIntReg.FNNAMES.concat([
  'LSB',
  'MSB',
  'Bit'
]);

exports.IMaskedIntReg = IMaskedIntReg;
