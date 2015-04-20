var util = require("util");
var IBasic = require("./IBasic");

var ICategory = function(parent,name) {
  IBasic.IBasic.call(this,parent,name);
  var me = this;
  me.typeName = 'ICategory';
  me.name = name;
  me.features = {};
}

util.inherits(ICategory, IBasic.IBasic);

ICategory.prototype.addFeature = function(value){
  var me = this;

  me.parent.get(value,function(o){
    me.features[value]=me[value]=o;
  });
}


exports.FNNAMES = IBasic.FNNAMES.concat([
]);

exports.ICategory = ICategory;
