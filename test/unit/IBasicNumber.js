var TYPES = require('../../lib/classes/types');
var GenAPI = require('../../lib/classes/GenAPI').GenAPI;
exports.utils = {
  pureValues: function(test){

      test.expect(3);

      var genapi = new GenAPI(null);
      var t = new TYPES.IBasicNumber(genapi,'N1');

      t.setMax(100);
      test.equals(t.max,100);

      t.setMin(0);
      test.equals(t.min,0);

      t.setRepresentation('Test');
      test.equals(t.representation,'Test');

      test.done();
  },
  
  pointedValues: function(test){
    test.expect(2);

    var genapi = new GenAPI(null);
    var p_min = new TYPES.IBasic(genapi,'POINT_MIN');
    p_min.setValue(100);
    var p_max = new TYPES.IBasic(genapi,'POINT_MAX');
    p_max.setValue(1000);

    var t = new TYPES.IBasicNumber(genapi,'N1');

    t.setPMax('POINT_MAX');
    test.equals(t.max,1000);

    t.setPMin('POINT_MIN');
    test.equals(t.min,100);


    test.done();

  }
}
