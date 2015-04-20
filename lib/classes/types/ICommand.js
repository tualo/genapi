var util = require("util");
var IBasic = require("./IBasic");

var ICommand = function(parent,name) {
  IBasic.IBasic.call(this,parent,name);
  var me = this;
  me.typeName = 'ICommand';
}

util.inherits(ICommand, IBasic.IBasic);


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
