var util = require("util");
var IBasic = require("./IBasic");
var vm = require('vm');
var XFormula = require("./XFormula").XFormula;

var ISwissKnife = function(parent,name) {
  IBasic.IBasic.call(this,parent,name);
  var me = this;
  me.typeName = 'ISwissKnife';
  me.variables = {};
}

util.inherits(ISwissKnife, IBasic.IBasic);


ISwissKnife.prototype.getValue = function(){
  var me = this;
  var vars = me.variables||{};
  if (me.name=='N1373'){
    console.log((new XFormula(vars,me.formula)).calculate());
  }
  return (new XFormula(vars,me.formula)).calculate();
}


ISwissKnife.prototype.setVariable = function(name,value){
  var me = this,v;
  me.variables[name] = value;
  v=(new XFormula(me.variables,me.formula)).calculate();
  if (typeof v === 'number'){
    this.setValue(v);//= (new XFormula(vars,me.formula)).calculate();
  }
}

ISwissKnife.prototype.setPVariable = function(name,value){
  var me = this;
  me.parent.get(value,function(pvalue){
    pvalue.on('value',function(value){
      me.setVariable(name,value);
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
