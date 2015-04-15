var fs = require('fs');
var path = require('path');
var util = require("util");
var events = require("events");
var TYPES = require("./types");
var Category = require("./Category").Category;

// `GenAPI([device])`
// Constructor for gen&lt;i&gt;cam API.
var GenAPI = function(device) {
  var me = this;
  // `device` is the low level API for the camera.
  me.device = device;
  // `values` Keeps the named values. This hash will be used by any value that has
  // references to other values.
  me.values = {};
  // Queues per named value-objects will keeped in `valuesQueue` for all
  // currently not exsisting named values. This only occurred during
  // sequentialy reading the device configuration file.
  me.valuesQueue = {};
  me.categories = {};
  me.features = {};
  events.EventEmitter.call(this);
}
util.inherits(GenAPI, events.EventEmitter);
// GenAPI extends EventEmitter


// `readRegister(address,length,callback)` will read a register
// at the given adress and length from the device.
// If no device is defined, callback will be never called.
// The callback is called with only one parameter,
// the buffer from given address.
GenAPI.prototype.readRegister = function(address,length,callback){
  var me = this;
  if (typeof me.device==='object'){
    me.readRegister(address,length,callback);
  }else{
    //console.log('error','GenAPI','getRegister','no device is set');
  }
}

// `addValue(name,type_obj)` adds a named value object to the values hash.
GenAPI.prototype.addValue = function(name,type_obj){
  var me = this,i,m;
  // Only if the named value does not exists allready it will be added.
  // Otherwise an error will be thrown.
  if (typeof me.values[name]==='undefined'){
    me.values[name] = type_obj;
    me.values[name].on('value',function(value){
      me.emit('value'+name+'',value);
    });
    // If  other value-object referencing to that value, they
    // will be informed once by there callback function.
    if (typeof me.valuesQueue[name]!=='undefined'){
      m = me.valuesQueue[name].length;
      for(i=0;i<m;i++){
        me.valuesQueue[name][i](me.values[name]);
      }
      // After informing referenced values the queue for that name
      // will be removed.
      delete me.valuesQueue[name];
    }
  }else{
    throw new Error(name+' allready exists, '+type_obj.typeName+' '+typeof me.values[name]);
  }
}

// `get(name,callback)` calls the callback function with the named value-object.
GenAPI.prototype.get = function(name,callback){
  var me = this;
  if (typeof me.values[name]==='undefined'){
    // If the named-value does not exists, the callback is added
    // to the `valuesQueue`.
    if (typeof me.valuesQueue[name]==='undefined'){
      me.valuesQueue[name] = [];
    }
    me.valuesQueue[name].push(callback);
  }else{
    callback(me.values[name]);
  }
}

exports.GenAPI = GenAPI;
