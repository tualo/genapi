var util = require("util");
var IBasic = require("./IBasic");

var ICommand = function(parent,name) {
  IBasic.IBasic.call(this,parent,name);
  var me = this;
  me.typeName = 'ICommand';
}
util.inherits(ICommand, IBasic.IBasic);


ICommand.prototype.run = function(){
  var me = this;

  if (typeof me.commandValue!=='undefined'){
    me.writeRawData(me.commandValue);
  }
  /*
  if (typeof me.pvalue==='string'){
    if (typeof me.parent[me.pvalue].address!=='undefined'){
      if (typeof me.commandValue!=='undefined'){

        me.parent[me.pvalue].port.writeRegister(me.parent[me.pvalue].address,me.commandValue*1,function(err,register){
          if (err){
            console.log(err);
          }else{
            console.log(register);
          }
        });

      }else{
        throw new Error('command value is missing');
      }
    }else{
      throw new Error('not implemented, missing address');
    }
  }else{
    throw new Error('not implemented');
  }
  */
}

ICommand.prototype.setCommandValue = function(value){
  var me = this;
  me.commandValue = value;
  me.emit('commandValue',value);
}

ICommand.prototype.setPCommandValue = function(value){
  var me = this;
  me.parent.get(value,function(pvalue){
    pvalue.on('value',function(value){
      me.setCommandValue(value);
    });
  });
}


exports.FNNAMES = IBasic.FNNAMES.concat([
  'CommandValue'
]);

exports.ICommand = ICommand;
