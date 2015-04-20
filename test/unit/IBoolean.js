var TYPES = require('../../lib/classes/types');
var GenAPI = require('../../lib/classes/GenAPI').GenAPI;
exports.utils = {
  pureValues: function(test){

      test.expect(7);

      var genapi = new GenAPI(null);
      var t = new TYPES.IBoolean(genapi,'N1');

      t.setValue(true);
      test.equals(t.getValue(),true,"simple one");

      t.setValue(false);
      test.equals(t.getValue(),false,"simple not one");

      t.setOnValue('');
      t.setOffValue('TEST');
      test.equals(t.onValue,'',"string on value");
      test.equals(t.offValue,'TEST',"string off value");


      t.setValue(true);
      test.equals(t.value,'',"empty string as true");
      test.equals(t.getValue(),true,"empty string as true");

      t.setValue(false);
      test.equals(t.getValue(),false,"test string as false");

      test.done();
  },

  pointedValues: function(test){
    test.expect(4);

    var genapi = new GenAPI(null);
    var p_off = new TYPES.IBasic(genapi,'POINT_OFF');
    p_off.setValue(100);
    var p_on = new TYPES.IBasic(genapi,'POINT_ON');
    p_on.setValue(1000);

    var t = new TYPES.IBoolean(genapi,'N1');

    t.setPOffValue('POINT_OFF');
    t.setPOnValue('POINT_ON');

    t.setValue(true);
    test.equals(t.value,1000,'pointed on value');
    test.equals(t.getValue(),true,'pointed on getValue');

    t.setValue(false);
    test.equals(t.value,100,'pointed off value');
    test.equals(t.getValue(),false,'pointed off getValue');



    test.done();

  }
}
