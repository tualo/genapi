var util = require("util");
var IBasic = require("./IBasic");

var ISwissKnife = function(parent,name) {
  var me = this;
  me.typeName = 'ISwissKnife';
  me.variables = {};
  IBasic.IBasic.call(this,parent,name);
}

util.inherits(ISwissKnife, IBasic.IBasic);



ISwissKnife.prototype.setVariable = function(name,value){
  var me = this;
  me.variables[name] = value;
  //me.emit('invalidator',value);
}
ISwissKnife.prototype.setPVariable = function(name,value){
  var me = this;
  me.parent.get(value,function(pvalue){
    pvalue.on('value',function(value){
      me.setVariable(value,name);
    });
  });
}


ISwissKnife.prototype.setFormula = function(value){
  var me = this;
  me.formula = value;
}

ISwissKnife.prototype.setPFormula = function(name){
  var me = this;
  me.parent.get(value,function(pvalue){
    pvalue.on('value',function(value){
      me.setFormula(value);
    });
  });
}

exports.FNNAMES = IBasic.FNNAMES.concat([
  'Variable',
  'Formula'
]);

exports.ISwissKnife = ISwissKnife;
