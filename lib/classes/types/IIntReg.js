var util = require("util");
var IRegister = require("./IRegister");

var IIntReg = function(parent,name) {
  IRegister.IRegister.call(this,parent,name);
  var me = this;
  me.typeName = 'IIntReg';

}

util.inherits(IIntReg, IRegister.IRegister);

IIntReg.prototype.queryData = function(){
  var me = this;
  //console.log(me.name,me.address,me.length,me.sign,me.endianess);
  if (
    (typeof me.address!=='undefined') &&
    (typeof me.length!=='undefined') &&
    (typeof me.sign!=='undefined') &&
    (typeof me.endianess!=='undefined') &&
    (typeof me.accessMode!=='undefined') &&
    ( me.isImplemented*1!==0) &&
    ( me.isAvailable*1!==0) &&
    (me.accessMode.indexOf('R')>=0)
  ){

    if (me.pPort === 'Device'){
      try{
      me.parent.device.readRegister(me.address,me.length,function(err,register){
        var registerValue = 0;
        var fnName = 'read';

        if (me.sign == 'Unsigned'){
          fnName+='U';
        }
        fnName+='Int';
        if (me.endianess == 'BigEndian'){
          fnName+='BE';
        }else{
          fnName+='LE';
        }

        if (err){
          var o = me;
          delete o.parent;
          console.log(o,(typeof me.address),me.name);
          throw err;
        }
        //console.log(register,me.name,me.address);

        me.setValue(register.readUIntBE(0,me.length));
      },me.name);
    }catch(e){
      console.log(me.name,e);
    }
    }else{
      //console.log(me.typeName,me.name,me.pPort,'not implemented');
    }

  }
}

IIntReg.prototype.setSign = function(value){
  var me = this;
  me.sign = value;
  me.emit('sign',value);
  me.queryData();
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
  me.emit('endianess',value);
  me.queryData();
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
