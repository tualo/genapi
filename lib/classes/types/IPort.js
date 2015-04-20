var util = require("util");
var IBasic = require("./IBasic");

var IPort = function(parent,name) {
  IBasic.IBasic.call(this,parent,name);
  var me = this;
  me.typeName = 'IPort';
  if (name==='Device'){
    if (typeof parent.device==='object'){
      me.setValue(parent.device);
    }
  }
}

util.inherits(IPort, IBasic.IBasic);


IPort.prototype.setChunkID = function(value){
  var me = this;
  me.chunkID = value;
  me.emit('chunkID',value);
}
IPort.prototype.setPChunkID = function(value){
  var me = this;
  me.parent.get(value,function(pvalue){
    pvalue.on('value',function(value){
      me.setChunkID(value);
    });
  });
}


IPort.prototype.setEventID = function(value){
  var me = this;
  me.eventID = value;
  me.emit('eventID',value);
}
IPort.prototype.setPEventID = function(value){
  var me = this;
  me.parent.get(value,function(pvalue){
    pvalue.on('value',function(value){
      me.setEventID(value);
    });
  });
}


exports.FNNAMES = IBasic.FNNAMES.concat([
  'ChunkID',
  'EventID'
]);

exports.IPort = IPort;
