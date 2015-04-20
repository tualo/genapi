var TYPES = require('../../lib/classes/types');
var GenAPI = require('../../lib/classes/GenAPI').GenAPI;
exports.utils = {
  integer: function(test){
      var v;

      test.expect(2);
      var genapi = new GenAPI(null);
      var int = new TYPES.IInteger(genapi,'N1');
      int.setValue(1);
      v = int.getValue();
      test.equals(v,1);

      var int = new TYPES.IInteger(genapi,'N2');
      int.setPValue('N1');
      v = int.getValue();
      test.equals(v,1);

      test.done();
  }
}
