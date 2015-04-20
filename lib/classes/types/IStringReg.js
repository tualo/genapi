var util = require("util");
var IRegister = require("./IRegister");

var IStringReg = function(parent,name) {
  IRegister.IRegister.call(this,parent,name);
  var me = this;
  me.typeName = 'IStringReg';
}

util.inherits(IStringReg, IRegister.IRegister);

IStringReg.prototype.queryData = function(){
  var me = this;
  if (
    (typeof me.address!=='undefined') &&
    (typeof me.length!=='undefined') &&
    (typeof me.accessMode!=='undefined') &&
    ( me.isImplemented*1!==0) &&
    ( me.isAvailable*1!==0) &&
    (me.accessMode.indexOf('R')>=0)
  ){
    if (me.pPort === 'Device'){
      me.parent.device.readPartial(me.address,me.length,function(error,register){
        if (error){
          console.log(me.typeName,me.name,error);
        }else{
          me.setValue(register.readString());
        }
      },me.name);
    }else{
      console.log(me.typeName,me.name,me.pPort,'not implemented');
    }
  }
}

exports.FNNAMES = IRegister.FNNAMES.concat([

]);

exports.IStringReg = IStringReg;
