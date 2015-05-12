var vm = require('vm');

var XFormula = function(variables,formula) {
  var me=this;
  me.formula = formula;
  me.variables = variables;
}

XFormula.prototype.prepare = function(term){
  var reg = new RegExp("0x[0-9A-F]{1,8}","gi");
  var matches = term.match(reg);
  var i,m;
  if (matches!==null){
    matches = matches.sort(function(a,b) {return (a.length < b.length) ? 1 : 0; });
    for(i=0,m=matches.length;i<m;i++){
      reg = new RegExp(matches[i],"gi");
      term = term.replace(reg,parseInt(matches[i]));
    }
  }
  term = term.replace(/=/g,'==');
  term = term.replace(/\&AMP;/g,'&');
  term = term.replace(/\&GT;/g,'>');
  term = term.replace(/\&LT;/g,'<');
  return term;
}

XFormula.prototype.calculate = function(){
  var me=this,
      term = me.formula,
      r;
  if (typeof me.formula==='undefined'){
    return ;
  }
  term = me.prepare(term.toUpperCase());

  /*
  var names = [];

  for (var name in me.variables){
    names.push(name);
  }
  names.sort(function(a,b) {return (a.length < b.length) ? 1 : 0; });

  for (var i =0;i<names.length;i++){
    var name = names[i];
    if (
      (typeof me.variables[name]==='undefined') ||
      (me.variables[name]===null)
    ){
      //console.log(name,me.variables)
      return ; // do nothing, we have to wait for som values;
    }
    r = new RegExp(name,'gi');
    term = term.replace(r,parseInt(me.variables[name]));
  }
  */
  try{
    var sandbox = {
      result: null,
      TRUNC:  function(v){ return Math.trunc(v); },
      FLOOR:  function(v){ return Math.floor(v); },
      CEIL:  function(v){ return Math.ceil(v); },
      ROUND: function( x, precision ){ return Math.round(x,precision); },
      ASIN:  function(v){ return Math.asin(v); },
      ACOS:  function(v){ return Math.acos(v); },
      SGN:  function(v){ return v; },
      NEG:  function(v){ return v*-1; },
      E:  function(v){ return Math.E; },
      PI:  function(){ return Math.PI; }
    };
    for (var name in me.variables){
      if (me.variables.hasOwnProperty(name)){
        sandbox[name] = me.variables[name]*1;
      }
    }


    vm.createContext(sandbox);
    vm.runInContext('result='+term,sandbox);
    if (sandbox.result!==null){
      return sandbox.result;
    }
  }catch(e){
    return;
    /*
    delete me.parent;
    console.error(me);
    console.error(e);
    console.log(term);
    process.exit();
    */
  }
}

exports.XFormula = XFormula;
