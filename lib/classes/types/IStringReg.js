var util = require("util");
var IRegister = require("./IRegister");

var IStringReg = function(parent,name) {
  var me = this;
  me.typeName = 'IStringReg';
  IRegister.IRegister.call(this,parent,name);
}

util.inherits(IStringReg, IRegister.IRegister);



/*
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
*/

exports.FNNAMES = IRegister.FNNAMES.concat([

]);

exports.IStringReg = IStringReg;
