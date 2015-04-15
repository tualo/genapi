var parseString = require('xml2js').parseString;
var fs = require('fs');
var path = require('path');



var Compiler = function(){
  this.code = [];
}

Compiler.prototype.compile = function(xmlString,name){
  var me = this;
  if (typeof name==='undefined'){
    name = 'BaslerGigECam';
  }
  parseString(xmlString, function (error, result) {
    if (error){
      console.log(error);
    }else{

        me.code = [];
        var item = result['RegisterDescription'];

        me.addCodeLine( "// MajorVersion = "+item['$']['MajorVersion']);
        me.addCodeLine( "// MinorVersion = "+item['$']['MinorVersion']);
        me.addCodeLine( "// ModelName = "+item['$']['ModelName']);
        me.addCodeLine( "// ProductGuid = "+item['$']['ProductGuid']);
        me.addCodeLine( "// SchemaMajorVersion = "+item['$']['SchemaMajorVersion']);
        me.addCodeLine( "// SchemaMinorVersion = "+item['$']['SchemaMinorVersion']);
        me.addCodeLine( "// SchemaSubMinorVersion = "+item['$']['SchemaSubMinorVersion']);
        me.addCodeLine( "// StandardNameSpace = "+item['$']['StandardNameSpace']);
        me.addCodeLine( "// SubMinorVersion = "+item['$']['SubMinorVersion']);
        me.addCodeLine( "// ToolTip = "+item['$']['ToolTip']);
        me.addCodeLine( "// VendorName = "+item['$']['VendorName']);
        me.addCodeLine( "// VersionGuid = "+item['$']['VersionGuid']);

        me.addCodeLine( "var GenAPI = require('genapi');");
        me.addCodeLine( 'var '+name+' = function(device){');
        me.addCodeLine( "\t"+'GenAPI.call(this,device);');
        me.addCodeLine( "\t"+'var me = this;');
        me.addCodeLine( "\t"+"me.MajorVersion = \""+item['$']['MajorVersion']+"\";");
        me.addCodeLine( "\t"+"me.MinorVersion = \""+item['$']['MinorVersion']+"\";");
        me.addCodeLine( "\t"+"me.ModelName = \""+item['$']['ModelName']+"\";");
        me.addCodeLine( "\t"+"me.ProductGuid = \""+item['$']['ProductGuid']+"\";");
        me.addCodeLine( "\t"+"me.SchemaMajorVersion = \""+item['$']['SchemaMajorVersion']+"\";");
        me.addCodeLine( "\t"+"me.SchemaMinorVersion = \""+item['$']['SchemaMinorVersion']+"\";");
        me.addCodeLine( "\t"+"me.SchemaSubMinorVersion = \""+item['$']['SchemaSubMinorVersion']+"\";");
        me.addCodeLine( "\t"+"me.StandardNameSpace = \""+item['$']['StandardNameSpace']+"\";");
        me.addCodeLine( "\t"+"me.SubMinorVersion = \""+item['$']['SubMinorVersion']+"\";");
        me.addCodeLine( "\t"+"me.ToolTip = \""+item['$']['ToolTip']+"\";");
        me.addCodeLine( "\t"+"me.VendorName = \""+item['$']['VendorName']+"\";");
        me.addCodeLine( "\t"+"me.VersionGuid = \""+item['$']['VersionGuid']+"\";");



        me.addCodeLine( '// #Categories' );
        me.categories(item['Category']); delete item['Category'];

        me.addCodeLine( '// #Enumerations' );
        me.enumeration(item['Enumeration']); delete item['Enumeration'];

        me.addCodeLine( '// #Integer' );
        me.integers(item['Integer']); delete item['Integer'];

        me.addCodeLine( '// #Boolean' );
        me.booleans(item['Boolean']); delete item['Boolean'];

        me.addCodeLine( '// #Float' );
        me.floats(item['Float']); delete item['Float'];

        me.addCodeLine( '// #Command' );
        me.commands(item['Command']); delete item['Command'];

        me.addCodeLine( '// #IntReg' );
        me.intregs(item['IntReg']); delete item['IntReg'];

        me.addCodeLine( '// #Register' );
        me.registers(item['Register']); delete item['Register'];

        me.addCodeLine( '// #StringReg' );
        me.registers(item['StringReg']); delete item['StringReg'];

        me.addCodeLine( '// #MaskedIntReg' );
        me.maskedintregs(item['MaskedIntReg']); delete item['MaskedIntReg'];

        me.addCodeLine( '// #SwissKnife' );
        me.swissknife(item['SwissKnife']); delete item['SwissKnife'];

        me.addCodeLine( '// #IntSwissKnife' );
        me.intswissknife(item['IntSwissKnife']); delete item['IntSwissKnife'];

        me.addCodeLine( '// #Converter' );
        me.converters(item['Converter']); delete item['Converter'];

        me.addCodeLine( '// #IntConverter' );
        me.intconverters(item['IntConverter']); delete item['IntConverter'];

        me.addCodeLine( '// #Port' );
        me.ports(item['Port']); delete item['Port'];


        delete item['$'];
        if (JSON.stringify(item,null,0)!=="{}"){
          throw new Error('Root, Some items are not implemented. '+JSON.stringify(item,null,0).substring(0,100));
        }

        me.addCodeLine( '}');

        me.addCodeLine( 'util.inherits('+name+', GenAPI);');


    }
  })
}
Compiler.prototype.getCode = function(){
  var me = this;
  return me.code.join("\n");
}

Compiler.prototype.addCodeLine = function(codeline){
  var me = this;
  me.code.push(codeline);
}


Compiler.prototype.categories = function(categories){
  var me = this;
  for(var i = 0,m=categories.length;i<m;i++ ){
    var attributes=[];

    var item = categories[i];
    var attr = item['$'];
    var name = attr['Name'];
    delete item['$'];
    attributes.push('me');
    attributes.push('\''+name+'\'');

    me.addCodeLine( "");
    if (item['Description']){
      me.addCodeLine( "\t // "+ ('`'+name+'` '+item['Description']));
    }else{
      me.addCodeLine( "\t // "+ ('`'+name+'`'));
    }

    me.addCodeLine( "\t"+'me.'+name+' = new '+'ICategory'+'('+attributes.join(',')+');');

    if (item['Description']){
      me.addCodeLine( "\t"+'me.'+name+'.setDescription("'+item['Description']+'");');
      delete item['Description'];
    }
    if (item['ToolTip']){
      me.addCodeLine( "\t"+'me.'+name+'.setToolTip("'+item['ToolTip']+'");');
      delete item['ToolTip'];
    }
    if (item['DisplayName']){
      me.addCodeLine( "\t"+'me.'+name+'.setDisplayName(\''+item['DisplayName']+'\');');
      delete item['DisplayName'];
    }
    if (item['Visibility']){
      me.addCodeLine( "\t"+'me.'+name+'.setVisibility(\''+item['Visibility']+'\');');
      delete item['Visibility'];
    }
    var features = item['pFeature'];
    for(var f=0;f<features.length;f++){
      me.addCodeLine( "\t"+'me.'+name+'.addFeature(\''+features[f]+'\');');
    }
    delete item['pFeature'];

    if (JSON.stringify(item,null,0)!=="{}"){
      throw new Error('IInteger, Some items are not implemented. '+JSON.stringify(item,null,0));
    }
  }
}


Compiler.prototype.enumeration = function(enumerations){
  var me = this;
  for(var i = 0,m=enumerations.length;i<m;i++ ){
    var attributes=[];

    var item = enumerations[i];
    var attr = item['$'];
    var name = attr['Name'];
    var enumEntry = item['EnumEntry']||[];
    delete item['EnumEntry'];
    attributes.push('me');
    attributes.push('\''+name+'\'');
    var desc = (item['Description']||'')+"";
    var FNNAMES = require('./types/IEnumeration').FNNAMES;
    var EFNNAMES = require('./types/IEnumEntry').FNNAMES;

    delete item['$'];

    attributes.push('me');
    attributes.push('\''+name+'\'');

    me.addCodeLine( "" );
    me.addCodeLine( "\t // "+ ('`'+name+'` '+desc));
    me.addCodeLine( "\t"+'me.'+name+' = new '+'IEnumeration'+'('+attributes.join(',')+');');

    for(var fn=0;fn<FNNAMES.length;fn++){
      if (item[FNNAMES[fn]]){
        me.addCodeLine( "\t"+'me.'+name+'.set'+FNNAMES[fn]+'("'+item[FNNAMES[fn]]+'");');
        delete item[FNNAMES[fn]];
      }
      if (item['p'+FNNAMES[fn]]){
        me.addCodeLine( "\t"+'me.'+name+'.set'+'P'+FNNAMES[fn]+'("'+item['p'+FNNAMES[fn]]+'");');
        delete item['p'+FNNAMES[fn]];
      }
    }



    for(var f=0;f<enumEntry.length;f++){
      var entryItem = enumEntry[f];
      var entryName = entryItem['$']['Name'];
      delete entryItem['$'];


      me.addCodeLine( "");
      if (entryItem['Description']){
        me.addCodeLine( "\t // "+ ('`'+entryName+'` '+entryItem['Description']));
      }else{
        me.addCodeLine( "\t // "+ ('`'+entryName+'` '));
      }
      me.addCodeLine( "\t"+'var entry'+name+entryName+' = new IEnumEntry(me)');

      for(var efn=0;efn<EFNNAMES.length;efn++){
        if (entryItem[EFNNAMES[efn]]){
          me.addCodeLine( "\t"+'me.'+name+'.set'+EFNNAMES[efn]+'("'+entryItem[EFNNAMES[efn]]+'");');
          delete entryItem[EFNNAMES[efn]];
        }
        if (entryItem['p'+EFNNAMES[efn]]){
          me.addCodeLine( "\t"+'me.'+name+'.set'+'P'+EFNNAMES[efn]+'("'+entryItem['p'+EFNNAMES[efn]]+'");');
          delete entryItem['p'+EFNNAMES[efn]];
        }
      }

      me.addCodeLine( "\t"+'me.'+name+'.addEnumEntry(\''+entryName+'\',entry'+name+entryName+');');


      if (JSON.stringify(entryItem,null,0)!=="{}"){
        throw new Error('IEnumEntry, Some items are not implemented. '+JSON.stringify(entryItem,null,0));
      }
    }

    if (JSON.stringify(item,null,0)!=="{}"){
      throw new Error('IEnumeration, Some items are not implemented. '+JSON.stringify(item,null,0));
    }
  }
}


Compiler.prototype.integers = function(integers){
  var me = this;
  for(var i = 0,m=integers.length;i<m;i++ ){
    var attributes=[];
    var item = integers[i];
    var attr = item['$'];
    var name = attr['Name'];
    var desc = (item['Description']||'')+"";
    var FNNAMES = require('./types/IInteger').FNNAMES;

    delete item['$'];

    attributes.push('me');
    attributes.push('\''+name+'\'');

    me.addCodeLine( "" );
    me.addCodeLine( "\t // "+ ('`'+name+'` '+desc));
    me.addCodeLine( "\t"+'me.'+name+' = new '+'IInteger'+'('+attributes.join(',')+');');

    for(var fn=0;fn<FNNAMES.length;fn++){
      if (item[FNNAMES[fn]]){
        me.addCodeLine( "\t"+'me.'+name+'.set'+FNNAMES[fn]+'("'+item[FNNAMES[fn]]+'");');
        delete item[FNNAMES[fn]];
      }
      if (item['p'+FNNAMES[fn]]){
        me.addCodeLine( "\t"+'me.'+name+'.set'+'P'+FNNAMES[fn]+'("'+item['p'+FNNAMES[fn]]+'");');
        delete item['p'+FNNAMES[fn]];
      }
    }


    if (JSON.stringify(item,null,0)!=="{}"){
      throw new Error('IInteger, Some items are not implemented. '+JSON.stringify(item,null,0));
    }
  }
}


Compiler.prototype.booleans = function(booleans){
  var me = this;
  for(var i = 0,m=booleans.length;i<m;i++ ){
    var attributes=[];
    var item = booleans[i];
    var attr = item['$'];
    var name = attr['Name'];
    var desc = (item['Description']||'')+"";
    var FNNAMES = require('./types/IBoolean').FNNAMES;

    delete item['$'];

    attributes.push('me');
    attributes.push('\''+name+'\'');

    me.addCodeLine( "" );
    me.addCodeLine( "\t // "+ ('`'+name+'` '+desc));
    me.addCodeLine( "\t"+'me.'+name+' = new '+'IBoolean'+'('+attributes.join(',')+');');

    for(var fn=0;fn<FNNAMES.length;fn++){
      if (item[FNNAMES[fn]]){
        me.addCodeLine( "\t"+'me.'+name+'.set'+FNNAMES[fn]+'("'+item[FNNAMES[fn]]+'");');
        delete item[FNNAMES[fn]];
      }
      if (item['p'+FNNAMES[fn]]){
        me.addCodeLine( "\t"+'me.'+name+'.set'+'P'+FNNAMES[fn]+'("'+item['p'+FNNAMES[fn]]+'");');
        delete item['p'+FNNAMES[fn]];
      }
    }

    if (JSON.stringify(item,null,0)!=="{}"){
      throw new Error('IBoolean, Some items are not implemented. '+JSON.stringify(item,null,0));
    }
  }
}

Compiler.prototype.floats = function(floats){
  var me = this;
  for(var i = 0,m=floats.length;i<m;i++ ){
    var attributes=[];
    var item = floats[i];
    var attr = item['$'];
    var name = attr['Name'];
    var desc = (item['Description']||'')+"";
    var FNNAMES = require('./types/IFloat').FNNAMES;

    delete item['$'];

    attributes.push('me');
    attributes.push('\''+name+'\'');

    me.addCodeLine( "" );
    me.addCodeLine( "\t // "+ ('`'+name+'` '+desc));
    me.addCodeLine( "\t"+'me.'+name+' = new '+'IFloat'+'('+attributes.join(',')+');');

    for(var fn=0;fn<FNNAMES.length;fn++){
      if (item[FNNAMES[fn]]){
        me.addCodeLine( "\t"+'me.'+name+'.set'+FNNAMES[fn]+'("'+item[FNNAMES[fn]]+'");');
        delete item[FNNAMES[fn]];
      }
      if (item['p'+FNNAMES[fn]]){
        me.addCodeLine( "\t"+'me.'+name+'.set'+'P'+FNNAMES[fn]+'("'+item['p'+FNNAMES[fn]]+'");');
        delete item['p'+FNNAMES[fn]];
      }
    }

    if (JSON.stringify(item,null,0)!=="{}"){
      throw new Error('IFloat, Some items are not implemented. '+JSON.stringify(item,null,0));
    }
  }
}



Compiler.prototype.commands = function(commands){
  var me = this;
  for(var i = 0,m=commands.length;i<m;i++ ){
    var attributes=[];
    var item = commands[i];
    var attr = item['$'];
    var name = attr['Name'];
    var desc = (item['Description']||'')+"";
    var FNNAMES = require('./types/ICommand').FNNAMES;

    delete item['$'];

    attributes.push('me');
    attributes.push('\''+name+'\'');

    me.addCodeLine( "" );
    me.addCodeLine( "\t // "+ ('`'+name+'` '+desc));
    me.addCodeLine( "\t"+'me.'+name+' = new '+'ICommand'+'('+attributes.join(',')+');');

    for(var fn=0;fn<FNNAMES.length;fn++){
      if (item[FNNAMES[fn]]){
        me.addCodeLine( "\t"+'me.'+name+'.set'+FNNAMES[fn]+'("'+item[FNNAMES[fn]]+'");');
        delete item[FNNAMES[fn]];
      }
      if (item['p'+FNNAMES[fn]]){
        me.addCodeLine( "\t"+'me.'+name+'.set'+'P'+FNNAMES[fn]+'("'+item['p'+FNNAMES[fn]]+'");');
        delete item['p'+FNNAMES[fn]];
      }
    }

    if (JSON.stringify(item,null,0)!=="{}"){
      throw new Error('ICommand, Some items are not implemented. '+JSON.stringify(item,null,0));
    }
  }
}



Compiler.prototype.intregs = function(list){
  var me = this;
  for(var i = 0,m=list.length;i<m;i++ ){
    var attributes=[];
    var item = list[i];
    var attr = item['$'];
    var name = attr['Name'];
    var desc = (item['Description']||'')+"";
    var FNNAMES = require('./types/IIntReg').FNNAMES;

    delete item['$'];

    attributes.push('me');
    attributes.push('\''+name+'\'');

    me.addCodeLine( "" );
    me.addCodeLine( "\t // "+ ('`'+name+'` '+desc));
    me.addCodeLine( "\t"+'me.'+name+' = new '+'IIntReg'+'('+attributes.join(',')+');');

    for(var fn=0;fn<FNNAMES.length;fn++){
      if (item[FNNAMES[fn]]){
        me.addCodeLine( "\t"+'me.'+name+'.set'+FNNAMES[fn]+'("'+item[FNNAMES[fn]]+'");');
        delete item[FNNAMES[fn]];
      }
      if (item['p'+FNNAMES[fn]]){
        me.addCodeLine( "\t"+'me.'+name+'.set'+'P'+FNNAMES[fn]+'("'+item['p'+FNNAMES[fn]]+'");');
        delete item['p'+FNNAMES[fn]];
      }
    }

    if (JSON.stringify(item,null,0)!=="{}"){
      throw new Error('IIntReg, Some items are not implemented. '+JSON.stringify(item,null,0));
    }
  }
}



Compiler.prototype.registers = function(list){
  var me = this;
  for(var i = 0,m=list.length;i<m;i++ ){
    var attributes=[];
    var item = list[i];
    var attr = item['$'];
    var name = attr['Name'];
    var desc = (item['Description']||'')+"";
    var FNNAMES = require('./types/IRegister').FNNAMES;

    delete item['$'];

    attributes.push('me');
    attributes.push('\''+name+'\'');

    me.addCodeLine( "" );
    me.addCodeLine( "\t // "+ ('`'+name+'` '+desc));
    me.addCodeLine( "\t"+'me.'+name+' = new '+'IRegister'+'('+attributes.join(',')+');');

    for(var fn=0;fn<FNNAMES.length;fn++){
      if (item[FNNAMES[fn]]){
        me.addCodeLine( "\t"+'me.'+name+'.set'+FNNAMES[fn]+'("'+item[FNNAMES[fn]]+'");');
        delete item[FNNAMES[fn]];
      }
      if (item['p'+FNNAMES[fn]]){
        me.addCodeLine( "\t"+'me.'+name+'.set'+'P'+FNNAMES[fn]+'("'+item['p'+FNNAMES[fn]]+'");');
        delete item['p'+FNNAMES[fn]];
      }
    }

    if (JSON.stringify(item,null,0)!=="{}"){
      throw new Error('IRegister, Some items are not implemented. '+JSON.stringify(item,null,0));
    }
  }
}

Compiler.prototype.stringregisters = function(list){
  var me = this;
  for(var i = 0,m=list.length;i<m;i++ ){
    var attributes=[];
    var item = list[i];
    var attr = item['$'];
    var name = attr['Name'];
    var desc = (item['Description']||'')+"";
    var FNNAMES = require('./types/IStringReg').FNNAMES;

    delete item['$'];

    attributes.push('me');
    attributes.push('\''+name+'\'');

    me.addCodeLine( "" );
    me.addCodeLine( "\t // "+ ('`'+name+'` '+desc));
    me.addCodeLine( "\t"+'me.'+name+' = new '+'IStringReg'+'('+attributes.join(',')+');');

    for(var fn=0;fn<FNNAMES.length;fn++){
      if (item[FNNAMES[fn]]){
        me.addCodeLine( "\t"+'me.'+name+'.set'+FNNAMES[fn]+'("'+item[FNNAMES[fn]]+'");');
        delete item[FNNAMES[fn]];
      }
      if (item['p'+FNNAMES[fn]]){
        me.addCodeLine( "\t"+'me.'+name+'.set'+'P'+FNNAMES[fn]+'("'+item['p'+FNNAMES[fn]]+'");');
        delete item['p'+FNNAMES[fn]];
      }
    }

    if (JSON.stringify(item,null,0)!=="{}"){
      throw new Error('IStringReg, Some items are not implemented. '+JSON.stringify(item,null,0));
    }
  }
}

Compiler.prototype.maskedintregs = function(list){
  var me = this;
  for(var i = 0,m=list.length;i<m;i++ ){
    var attributes=[];
    var item = list[i];
    var attr = item['$'];
    var name = attr['Name'];
    var desc = (item['Description']||'')+"";
    var FNNAMES = require('./types/IMaskedIntReg').FNNAMES;

    delete item['$'];

    attributes.push('me');
    attributes.push('\''+name+'\'');

    me.addCodeLine( "" );
    me.addCodeLine( "\t // "+ ('`'+name+'` '+desc));
    me.addCodeLine( "\t"+'me.'+name+' = new '+'IMaskedIntReg'+'('+attributes.join(',')+');');

    for(var fn=0;fn<FNNAMES.length;fn++){
      if (item[FNNAMES[fn]]){
        me.addCodeLine( "\t"+'me.'+name+'.set'+FNNAMES[fn]+'("'+item[FNNAMES[fn]]+'");');
        delete item[FNNAMES[fn]];
      }
      if (item['p'+FNNAMES[fn]]){
        me.addCodeLine( "\t"+'me.'+name+'.set'+'P'+FNNAMES[fn]+'("'+item['p'+FNNAMES[fn]]+'");');
        delete item['p'+FNNAMES[fn]];
      }
    }

    if (JSON.stringify(item,null,0)!=="{}"){
      throw new Error('IMaskedIntReg, Some items are not implemented. '+JSON.stringify(item,null,0));
    }
  }
}

Compiler.prototype.swissknife = function(list){
  var me = this;
  for(var i = 0,m=list.length;i<m;i++ ){
    var attributes=[];
    var item = list[i];
    var attr = item['$'];
    var name = attr['Name'];
    var desc = (item['Description']||'')+"";
    var FNNAMES = require('./types/ISwissKnife').FNNAMES;
    var pVariables = item['pVariable']||[];
    var Variables = item['Variable']||[];
    delete item['$'];
    delete item['pVariable']
    delete item['Variable']

    attributes.push('me');
    attributes.push('\''+name+'\'');

    me.addCodeLine( "" );
    me.addCodeLine( "\t // "+ ('`'+name+'` '+desc));
    me.addCodeLine( "\t"+'me.'+name+' = new '+'ISwissKnife'+'('+attributes.join(',')+');');


    for(var fn=0;fn<pVariables.length;fn++){
      var vName = pVariables[fn]['$']['Name'];
      var vValue = pVariables[fn]['_'];
      me.addCodeLine( "\t"+'me.'+name+'.setPVariables("'+vName+'","'+vValue+'");');
    }
    for(var fn=0;fn<Variables.length;fn++){
      var vName = Variables[fn]['$']['Name'];
      var vValue = Variables[fn]['_'];
      me.addCodeLine( "\t"+'me.'+name+'.setVariables("'+vName+'","'+vValue+'");');
    }

    for(var fn=0;fn<FNNAMES.length;fn++){
      if (item[FNNAMES[fn]]){
        me.addCodeLine( "\t"+'me.'+name+'.set'+FNNAMES[fn]+'("'+item[FNNAMES[fn]]+'");');
        delete item[FNNAMES[fn]];
      }
      if (item['p'+FNNAMES[fn]]){
        me.addCodeLine( "\t"+'me.'+name+'.set'+'P'+FNNAMES[fn]+'("'+item['p'+FNNAMES[fn]]+'");');
        delete item['p'+FNNAMES[fn]];
      }
    }

    if (JSON.stringify(item,null,0)!=="{}"){
      throw new Error('ISwissKnife, Some items are not implemented. '+JSON.stringify(item,null,0));
    }
  }
}

Compiler.prototype.intswissknife = function(list){
  var me = this;
  for(var i = 0,m=list.length;i<m;i++ ){
    var attributes=[];
    var item = list[i];
    var attr = item['$'];
    var name = attr['Name'];
    var desc = (item['Description']||'')+"";
    var FNNAMES = require('./types/IIntSwissKnife').FNNAMES;
    var pVariables = item['pVariable']||[];
    var Variables = item['Variable']||[];
    delete item['$'];
    delete item['pVariable']
    delete item['Variable']

    attributes.push('me');
    attributes.push('\''+name+'\'');

    me.addCodeLine( "" );
    me.addCodeLine( "\t // "+ ('`'+name+'` '+desc));
    me.addCodeLine( "\t"+'me.'+name+' = new '+'IIntSwissKnife'+'('+attributes.join(',')+');');


    for(var fn=0;fn<pVariables.length;fn++){
      var vName = pVariables[fn]['$']['Name'];
      var vValue = pVariables[fn]['_'];
      me.addCodeLine( "\t"+'me.'+name+'.setPVariables("'+vName+'","'+vValue+'");');
    }
    for(var fn=0;fn<Variables.length;fn++){
      var vName = Variables[fn]['$']['Name'];
      var vValue = Variables[fn]['_'];
      me.addCodeLine( "\t"+'me.'+name+'.setVariables("'+vName+'","'+vValue+'");');
    }

    for(var fn=0;fn<FNNAMES.length;fn++){
      if (item[FNNAMES[fn]]){
        me.addCodeLine( "\t"+'me.'+name+'.set'+FNNAMES[fn]+'("'+item[FNNAMES[fn]]+'");');
        delete item[FNNAMES[fn]];
      }
      if (item['p'+FNNAMES[fn]]){
        me.addCodeLine( "\t"+'me.'+name+'.set'+'P'+FNNAMES[fn]+'("'+item['p'+FNNAMES[fn]]+'");');
        delete item['p'+FNNAMES[fn]];
      }
    }

    if (JSON.stringify(item,null,0)!=="{}"){
      throw new Error('IIntSwissKnife, Some items are not implemented. '+JSON.stringify(item,null,0));
    }
  }
}



Compiler.prototype.intconverters = function(list){
  var me = this;
  for(var i = 0,m=list.length;i<m;i++ ){
    var attributes=[];
    var item = list[i];
    var attr = item['$'];
    var name = attr['Name'];
    var desc = (item['Description']||'')+"";
    var FNNAMES = require('./types/IIntConverter').FNNAMES;
    var pVariables = item['pVariable']||[];
    var Variables = item['Variable']||[];
    delete item['$'];
    delete item['pVariable']
    delete item['Variable']

    attributes.push('me');
    attributes.push('\''+name+'\'');

    me.addCodeLine( "" );
    me.addCodeLine( "\t // "+ ('`'+name+'` '+desc));
    me.addCodeLine( "\t"+'me.'+name+' = new '+'IIntConverter'+'('+attributes.join(',')+');');


    for(var fn=0;fn<pVariables.length;fn++){
      var vName = pVariables[fn]['$']['Name'];
      var vValue = pVariables[fn]['_'];
      me.addCodeLine( "\t"+'me.'+name+'.setPVariables("'+vName+'","'+vValue+'");');
    }
    for(var fn=0;fn<Variables.length;fn++){
      var vName = Variables[fn]['$']['Name'];
      var vValue = Variables[fn]['_'];
      me.addCodeLine( "\t"+'me.'+name+'.setVariables("'+vName+'","'+vValue+'");');
    }

    for(var fn=0;fn<FNNAMES.length;fn++){
      if (item[FNNAMES[fn]]){
        me.addCodeLine( "\t"+'me.'+name+'.set'+FNNAMES[fn]+'("'+item[FNNAMES[fn]]+'");');
        delete item[FNNAMES[fn]];
      }
      if (item['p'+FNNAMES[fn]]){
        me.addCodeLine( "\t"+'me.'+name+'.set'+'P'+FNNAMES[fn]+'("'+item['p'+FNNAMES[fn]]+'");');
        delete item['p'+FNNAMES[fn]];
      }
    }

    if (JSON.stringify(item,null,0)!=="{}"){
      throw new Error('IIntConverter, Some items are not implemented. '+JSON.stringify(item,null,0));
    }
  }
}



Compiler.prototype.converters = function(list){
  var me = this;
  for(var i = 0,m=list.length;i<m;i++ ){
    var attributes=[];
    var item = list[i];
    var attr = item['$'];
    var name = attr['Name'];
    var desc = (item['Description']||'')+"";
    var FNNAMES = require('./types/IConverter').FNNAMES;
    var pVariables = item['pVariable']||[];
    var Variables = item['Variable']||[];
    delete item['$'];
    delete item['pVariable']
    delete item['Variable']

    attributes.push('me');
    attributes.push('\''+name+'\'');

    me.addCodeLine( "" );
    me.addCodeLine( "\t // "+ ('`'+name+'` '+desc));
    me.addCodeLine( "\t"+'me.'+name+' = new '+'IConverter'+'('+attributes.join(',')+');');


    for(var fn=0;fn<pVariables.length;fn++){
      var vName = pVariables[fn]['$']['Name'];
      var vValue = pVariables[fn]['_'];
      me.addCodeLine( "\t"+'me.'+name+'.setPVariables("'+vName+'","'+vValue+'");');
    }
    for(var fn=0;fn<Variables.length;fn++){
      var vName = Variables[fn]['$']['Name'];
      var vValue = Variables[fn]['_'];
      me.addCodeLine( "\t"+'me.'+name+'.setVariables("'+vName+'","'+vValue+'");');
    }

    for(var fn=0;fn<FNNAMES.length;fn++){
      if (item[FNNAMES[fn]]){
        me.addCodeLine( "\t"+'me.'+name+'.set'+FNNAMES[fn]+'("'+item[FNNAMES[fn]]+'");');
        delete item[FNNAMES[fn]];
      }
      if (item['p'+FNNAMES[fn]]){
        me.addCodeLine( "\t"+'me.'+name+'.set'+'P'+FNNAMES[fn]+'("'+item['p'+FNNAMES[fn]]+'");');
        delete item['p'+FNNAMES[fn]];
      }
    }

    if (JSON.stringify(item,null,0)!=="{}"){
      throw new Error('IConverter, Some items are not implemented. '+JSON.stringify(item,null,0));
    }
  }
}

Compiler.prototype.ports = function(list){
  var me = this;
  for(var i = 0,m=list.length;i<m;i++ ){
    var attributes=[];
    var item = list[i];
    var attr = item['$'];
    var name = attr['Name'];
    var desc = (item['Description']||'')+"";
    var FNNAMES = require('./types/IPort').FNNAMES;

    delete item['$'];

    attributes.push('me');
    attributes.push('\''+name+'\'');

    me.addCodeLine( "" );
    me.addCodeLine( "\t // "+ ('`'+name+'` '+desc));
    me.addCodeLine( "\t"+'me.'+name+' = new '+'IPort'+'('+attributes.join(',')+');');

    for(var fn=0;fn<FNNAMES.length;fn++){
      if (item[FNNAMES[fn]]){
        me.addCodeLine( "\t"+'me.'+name+'.set'+FNNAMES[fn]+'("'+item[FNNAMES[fn]]+'");');
        delete item[FNNAMES[fn]];
      }
      if (item['p'+FNNAMES[fn]]){
        me.addCodeLine( "\t"+'me.'+name+'.set'+'P'+FNNAMES[fn]+'("'+item['p'+FNNAMES[fn]]+'");');
        delete item['p'+FNNAMES[fn]];
      }
    }

    if (JSON.stringify(item,null,0)!=="{}"){
      throw new Error('IPort, Some items are not implemented. '+JSON.stringify(item,null,0));
    }
  }
}



exports.Compiler = Compiler;
