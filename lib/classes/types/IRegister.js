var util = require("util");
var IBasic = require("./IBasic");

var IRegister = function(parent,name) {
  IBasic.IBasic.call(this,parent,name);
  var me = this;
  me.typeName = 'IRegister';

  me.on('isAvailable',me.queryData.bind(me));
  me.on('isImplemented',me.queryData.bind(me));
  me.on('length',me.queryData.bind(me));
  me.on('accessMode',me.queryData.bind(me));
  me.on('address',me.queryData.bind(me));
  me.on('port',me.queryData.bind(me));

}

util.inherits(IRegister, IBasic.IBasic);

IRegister.prototype.queryData = function(){
  var me = this;

  if (
    (typeof me.address!=='undefined') &&
    (typeof me.length!=='undefined') &&
    (typeof me.accessMode!=='undefined') &&
    ( me.isImplemented*1!==0) &&
    ( me.isAvailable*1!==0) &&
    (me.accessMode.indexOf('R')>=0) &&
    (typeof me.port !== 'undefined')
  ){

//    console.log(me.name,'*',me.pPort);
    me.port.readRegister(me.address,me.length,function(err,register){
      if (err){
        var o = me;
        delete o.parent;
        console.log('#',err.toString(),o);
      }else{
        var v = register.readString();

        me.setValue(v);
        //console.log('****',me.name,v);
      }
    },me.name);

  }else{
    //console.log(me.name,' ***',me.pPort,( me.isImplemented*1!==0),( me.isAvailable*1!==0));
  }
}


// The `Address` element gives the address of the register in the
// camera’s register space.
IRegister.prototype.setAddress = function(value){
  var me = this;
  me.address = value;
  me.emit('address',value);
}
IRegister.prototype.setPAddress = function(value){
  var me = this;
  me.parent.get(value,function(pvalue){
    pvalue.on('value',function(value){
      me.setAddress(value);
    });
  });
}


//The `Length` element gives the length of the register in bytes.
IRegister.prototype.setLength = function(value){
  var me = this;
  me.length = value;
  me.emit('length',value);
}
IRegister.prototype.setPLength = function(value){
  var me = this;
  me.parent.get(value,function(pvalue){
    pvalue.on('value',function(value){
      me.setLength(value);
    });
  });
}

//The `AccessMode` element can have the values RW (read/write),
//RO (read only), or WO (write only) and indicates what the camera can deliver.
IRegister.prototype.setAccessMode = function(value){
  var me = this;
  me.accessMode = value;
  me.emit('accessMode',value);
}
IRegister.prototype.setPAccessMode = function(value){
  var me = this;
  me.parent.get(value,function(pvalue){
    pvalue.on('value',function(value){
      me.setAccessMode(value);
    });
  });
}

// The `Port` element contains the name of a Port node that gives access to
// the camera’s register space
IRegister.prototype.setPort = function(value){
  var me = this;
  me.port = value;
  me.emit('port',value);
}
IRegister.prototype.setPPort = function(value){
  var me = this;
  me.pPort = value;
  me.parent.get(value,function(pvalue){
    pvalue.on('value',function(value){
      me.setPort(value);
    });
  });
}


//The `Cacheable` element can have the values NoCache, WriteThrough, and
//WriteAround. WriteThrough means that a value written to the camera is
//written to the cache as well. WriteAround means that only read values are
//written to the cache. The latter behavior makes sense, for example, with an
//IFloat::Gain node where the user can write any value, but when reading back,
//will retrieve a value that has been rounded by the camera to a value the
//internal analog-to-digital converter is able to deliver. Note that caching
//is an optional feature of any implementation.

IRegister.prototype.setCachable = function(value){
  var me = this;
  me.cachable = value;
  me.emit('cachable',value);
}
IRegister.prototype.setPCachable = function(value){
  var me = this;
  me.parent.get(value,function(pvalue){
    pvalue.on('value',function(value){
      me.setCachable(value);
    });
  });
}


//The `PollingTime` element denotes a recommended time
//interval [in ms] after which a node should be invalidated.
//Note that polling is an optional feature of any implementation
//and the polling time is a hint only.

IRegister.prototype.setPollingTime = function(value){
  var me = this;
  me.pollingTime = value;
  me.emit('pollingTime',value);


}
IRegister.prototype.setPPollingTime = function(value){
  var me = this;
  me.parent.get(value,function(pvalue){
    pvalue.on('value',function(value){
      me.setPollingTime(value);
    });
  });
}


IRegister.prototype.setInvalidator = function(value){
  var me = this;
  me.invalidator = value;
  me.emit('invalidator',value);
}
IRegister.prototype.setPInvalidator = function(value){
  var me = this;
  me.parent.get(value,function(pvalue){
    pvalue.on('value',function(value){
      me.setInvalidator(value);
    });
  });
}




exports.FNNAMES = IBasic.FNNAMES.concat([
  'AccessMode',
  'Length',
  'Address',
  'Port',
  'Cachable',
  'PollingTime'
]);

exports.IRegister = IRegister;
