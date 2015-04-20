var TYPES = require('../../lib/classes/types');
var GenAPI = require('../../lib/classes/GenAPI').GenAPI;
exports.utils = {
  formula: function(test){
      var v;

      test.expect(5);

      var genapi = new GenAPI(null);
      var int = new TYPES.IInteger(genapi,'N1');
      int.setValue(1);

      var int2 = new TYPES.IInteger(genapi,'N2');
      int2.setValue(1);

      var iconverter = new TYPES.IConverter(genapi,'TEST');
      iconverter.setPVariable("P1","N1");
      iconverter.setPValue("N2");

      iconverter.setFormulaFrom("TO*P1/1000");
      iconverter.setFormulaTo("FROM*1000/P1");
      test.equals(iconverter.value,1);

      test.equals(iconverter.formulaTo,'FROM*1000/P1')

      v = iconverter.getValue();
      test.equals(v,0.001);


      iconverter.setValue(2);
      v = iconverter.getValue();
      test.equals(iconverter.value,2000);
      test.equals(v,2);


      test.done();
  }
}
