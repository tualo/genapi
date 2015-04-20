var util = require("util");
var events = require("events");

var IBasic = function(parent,name) {
  var me = this;
  me.typeName = 'IBasic';
  me.parent = parent;

  me.name = name;

  events.EventEmitter.call(this);
  me.on('newListener',function(name,handler){
    if ( (name==='value') && (me.value!==null) ){
      handler(me.value);
    }
  });
  me.setMaxListeners(1500);
  me.parent.addValue(name,me);
}

util.inherits(IBasic, events.EventEmitter);


IBasic.prototype.setDescription = function(value){
  var me = this;
  me.description = value;
  me.emit('description',value);
}

IBasic.prototype.setDisplayName = function(value){
  var me = this;
  me.displayName = value;
  me.emit('displayName',value);
}

IBasic.prototype.setToolTip = function(value){
  var me = this;
  me.toolTip = value;
  me.emit('toolTip',value);
}

IBasic.prototype.setVisibility = function(value){
  var me = this;
  me.visibility = value;
  me.emit('visibility',value);
}

IBasic.prototype.setImposedAccessMode = function(value){
  var me = this;
  me.imposedAccessMode = value;
  me.emit('imposedAccessMode',value);
}



IBasic.prototype.setIsAvailable = function(value){
  var me = this;
  me.isAvailable = value;
  me.emit('isAvailable',value);
}
IBasic.prototype.setPIsAvailable = function(value){
  var me = this;
  me.parent.get(value,function(pvalue){
    pvalue.on('value',function(value){
      me.setIsAvailable(value);
    });
  });
}

IBasic.prototype.setIsImplemented = function(value){
  var me = this;
  me.isImplemented = value;
  me.emit('isImplemented',value);
}
IBasic.prototype.setPIsImplemented = function(value){
  var me = this;
  me.parent.get(value,function(pvalue){
    pvalue.on('value',function(value){
      me.setIsImplemented(value);
    });
  });
}

IBasic.prototype.setIsLocked = function(value){
  var me = this;
  me.isLocked = value;
  me.emit('isLocked',value);
}
IBasic.prototype.setPIsLocked = function(value){
  var me = this;
  me.parent.get(value,function(pvalue){
    pvalue.on('value',function(value){
      me.setIsLocked(value);
    });
  });
}

IBasic.prototype.getValue = function(){
  var me = this;
  return me.value;
}
IBasic.prototype.setValue = function(value){
  var me = this;
  me.setRawValue(value);
}
IBasic.prototype.setRawValue = function(value){
  var me = this;
  me.value = value;
  me.emit('value',value);
}
IBasic.prototype.setPValue = function(value){
  var me = this;
  me.parent.get(value,function(pvalue){
    pvalue.on('value',function(value){
      me.setRawValue(pvalue.getValue());
    });
  });
}


IBasic.prototype.setStreamable = function(value){
  var me = this;
  me.streamable = value;
  me.emit('streamable',value);
}
IBasic.prototype.setPStreamable = function(value){
  var me = this;
  me.parent.get(value,function(pvalue){
    pvalue.on('value',function(value){
      me.setStreamable(value);
    });
  });
}



IBasic.prototype.setSelected = function(value){
  var me = this;
  me.selected = value;
  me.emit('selected',value);
}
IBasic.prototype.setPSelected = function(value){
  var me = this;
  me.parent.get(value,function(pvalue){
    pvalue.on('value',function(value){
      me.setSelected(value);
    });
  });
}


exports.FNNAMES = [
  'Invalidator',
  'IsLocked',
  'IsAvailable',
  'ImposedAccessMode',
  'Visibility',
  'ToolTip',
  'DisplayName',
  'Description',
  'Value',
  'IsImplemented',
  'Selected',
  'Streamable'
];
exports.IBasic = IBasic;
