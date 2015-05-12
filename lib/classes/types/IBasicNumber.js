var util = require("util");
var IBasic = require("./IBasic");

var IBasicNumber = function(parent,name) {
  IBasic.IBasic.call(this,parent,name);
  var me = this;

  me.min = -9999999;
  me.max = 9999999;
  
  me.typeName = 'IBasicNumber';
}

util.inherits(IBasicNumber, IBasic.IBasic);
IBasicNumber.prototype.setRepresentation = function(value){
  var me = this;
  me.representation = value;
  me.emit('representation',value);
}


IBasicNumber.prototype.setMin = function(value){
  var me = this;
  me.min = value;
  me.emit('min',value);
}
IBasicNumber.prototype.setPMin = function(value){
  var me = this;
  me.parent.get(value,function(pvalue){
    pvalue.on('value',function(value){
      me.setMin(value);
    });
  });
}


IBasicNumber.prototype.setMax = function(value){
  var me = this;
  me.max = value;
  me.emit('max',value);
}
IBasicNumber.prototype.setPMax = function(value){
  var me = this;
  me.parent.get(value,function(pvalue){
    pvalue.on('value',function(value){
      me.setMax(value);
    });
  });
}


exports.FNNAMES = IBasic.FNNAMES.concat([
  'Min',
  'Max',
  'Representation'
]);

exports.IBasicNumber = IBasicNumber;
