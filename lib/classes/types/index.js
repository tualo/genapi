var typesList = [
  'IInteger',
  'IIntReg',
  'IMaskedIntReg',
  'IConverter',
  'IIntConverter',
  'ISwissKnife',
  'IIntSwissKnife',
  'IStringReg',
  'IFloat',
  'IBoolean',
  'IPort',
  'IRegister',
  'IEnumEntry',
  'IEnumeration',
  'IConverter',
  'ICommand',
  'IBasicNumber',
  'IBasic'
];

for(var i=0;i<typesList.length;i++){
  exports[typesList[i]] = require("./"+typesList[i])[typesList[i]];
}
