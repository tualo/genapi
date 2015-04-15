var util = require("util");
var IRegister = require("./IRegister");

var IIntReg = function(parent,name) {
  var me = this;
  me.typeName = 'IIntReg';
  IRegister.IRegister.call(this,parent,name);
}

util.inherits(IIntReg, IRegister.IRegister);



IIntReg.prototype.setSign = function(value){
  var me = this;
  me.sign = value;
  me.emit('sign',value);
}
IIntReg.prototype.setPSign = function(value){
  var me = this;
  me.parent.get(value,function(pvalue){
    pvalue.on('value',function(value){
      me.setSign(value);
    });
  });
}


IIntReg.prototype.setEndianess = function(value){
  var me = this;
  me.endianess = value;
  me.emit('sign',value);
}
IIntReg.prototype.setPEndianess = function(value){
  var me = this;
  me.parent.get(value,function(pvalue){
    pvalue.on('value',function(value){
      me.setEndianess(value);
    });
  });
}

IIntReg.prototype.setRepresentation = function(value){
  var me = this;
  me.representation = value;
  me.emit('representation',value);
}

exports.FNNAMES = IRegister.FNNAMES.concat([
  'Sign',
  'Endianess',
  'Representation'
]);

exports.IIntReg = IIntReg;
