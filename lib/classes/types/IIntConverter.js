var util = require("util");
var IConverter = require("./IConverter");

var IIntConverter = function(parent,name) {
  var me = this;
  me.typeName = 'IIntConverter';
  IConverter.IConverter.call(this,parent,name);
}

util.inherits(IIntConverter, IConverter.IConverter);
/*

IConverter.prototype.setEventID = function(value){
  var me = this;
  me.eventID = value;
  me.emit('eventID',value);
}
IConverter.prototype.setPEventID = function(value){
  var me = this;
  me.parent.get(value,function(pvalue){
    pvalue.on('value',function(value){
      me.setEventID(value);
    });
  });
}
*/

exports.FNNAMES = IConverter.FNNAMES.concat([

]);

exports.IIntConverter = IConverter;
