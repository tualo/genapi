var util = require("util");
var IIntReg = require("./IIntReg");

var IMaskedIntReg = function(parent,name) {
  IIntReg.IIntReg.call(this,parent,name);
  var me = this;
  me.typeName = 'IMaskedIntReg';
}

util.inherits(IMaskedIntReg, IIntReg.IIntReg);


IMaskedIntReg.prototype.queryData = function(){
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

      me.parent.device.readRegister( me.address ,me.length,function(err,register){
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
          console.log(o,(typeof me.address));
          throw err;
        }
        if (me.msb && me.lsb){
          me.setValue(register.readUIntBE(Math.floor(me.msb/8), Math.ceil(me.lsb/8-me.msb/8) ));
        }else if (me.bit){
          me.setValue(register.isBit(me.bit));
          /*
          if (me.length*1===4){
            me.setValue(me.parent.device.isBitSet16(register.readUIntBE(0,me.length),me.bit));
            console.log(register,register.isBit(me.bit),me.bit,me.parent.device.isBitSet16(register.readUIntBE(0,me.length),me.bit));
            process.exit();

          }else if (me.length*1===8){
            me.setValue(me.parent.device.isBitSet32(register.readUIntBE(0,me.length),me.bit));
          }else{
            console.log(me);
            throw Error(' unsupported length '+me.length);
          }
          */
        }else{
          console.log(me);
          throw Error('i am an error ;) ');
        }
      },me.name);
    }else{
      //console.log(me.typeName,me.name,me.pPort,'not implemented');
    }

  }
}



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
