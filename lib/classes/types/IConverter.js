var util = require("util");
var IBasic = require("./IBasic");

var IConverter = function(parent,name) {
  var me = this;
  me.typeName = 'IConverter';
  IBasic.IBasic.call(this,parent,name);
}

util.inherits(IConverter, IBasic.IBasic);


IConverter.prototype.setFormulaFrom = function(value){
  var me = this;
  me.formulaFrom = value;
  me.emit('formulaFrom',value);
}
IConverter.prototype.setPFormulaFrom = function(value){
  var me = this;
  me.parent.get(value,function(pvalue){
    pvalue.on('value',function(value){
      me.setFormulaFrom(value);
    });
  });
}


IConverter.prototype.setFormulaTo = function(value){
  var me = this;
  me.formulaTo = value;
  me.emit('formulaTo',value);
}
IConverter.prototype.setPFormulaTo = function(value){
  var me = this;
  me.parent.get(value,function(pvalue){
    pvalue.on('value',function(value){
      me.setFormulaTo(value);
    });
  });
}

// The `Slope` entry indicates if the formula is monotonously Increasing
// or Decreasing, if it is Varying (in this case the full number range is used),
// or if the slope is determined in an Automatic way by probing the function.
IConverter.prototype.setSlope = function(value){
  var me = this;
  me.slope = value;
  me.emit('slope',value);
}
IConverter.prototype.setPSlope = function(value){
  var me = this;
  me.parent.get(value,function(pvalue){
    pvalue.on('value',function(value){
      me.setSlope(value);
    });
  });
}

exports.FNNAMES = IBasic.FNNAMES.concat([
  'FormulaFrom',
  'FormulaTo',
  'Slope'
]);

exports.IConverter = IConverter;
