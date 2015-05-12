var TYPES = require('../../lib/classes/types');
var GenAPI = require('../../lib/classes/GenAPI').GenAPI;
exports.utils = {
  pureValues: function(test){

      test.expect(10);

      var genapi = new GenAPI(null);
      var t = new TYPES.IBasic(genapi,'N1');

      t.setValue(1);
      test.equals(t.value,1);

      t.setIsAvailable(0);
      test.equals(t.isAvailable,0);

      t.setIsImplemented(1);
      test.equals(t.isImplemented,1);

      t.setIsLocked(0);
      test.equals(t.isLocked,0);

      t.setStreamable(1);
      test.equals(t.streamable,1);

      t.setSelected(0);
      test.equals(t.selected,0);
      /*
      t.setInvalidator('N2');
      test.equals(t.invalidator,'N2');
      */
      t.setVisibility('Simple');
      test.equals(t.visibility,'Simple');

      t.setToolTip('My Tip');
      test.equals(t.toolTip,'My Tip');

      t.setDisplayName('Some Name');
      test.equals(t.displayName,'Some Name');

      t.setDescription('Description');
      test.equals(t.description,'Description');

      test.done();
  },
  pointedValues: function(test){
    test.expect(6);

    var genapi = new GenAPI(null);
    var p = new TYPES.IBasic(genapi,'POINT');
    p.setValue(123);
    var t = new TYPES.IBasic(genapi,'N1');

    t.setPValue('POINT');
    test.equals(t.value,123,"Value Pointer");

    p.setValue(1);
    t.setPIsAvailable('POINT');
    test.equals(t.isAvailable,1,"Aviable Pointer");

    p.setValue(0);
    t.setPIsImplemented('POINT');
    test.equals(t.isImplemented,0,"Implemeted Pointer");

    p.setValue(1);
    t.setPIsLocked('POINT');
    test.equals(t.isLocked,1,"Locked Pointer");

    p.setValue(0);
    t.setPStreamable('POINT');
    test.equals(t.streamable,0,"Steamable Pointer");

    p.setValue(1);
    t.setPSelected('POINT');
    test.equals(t.selected,1,"Selected Pointer");

    test.done();
  },
  invalidator: function(test){
    test.expect(1);
    var genapi = new GenAPI(null);

    var p = new TYPES.IBasic(genapi,'POINT');
    p.setValue(5);

    var t = new TYPES.IBasic(genapi,'N1');

    t.setPValue('POINT');
    test.equals(t.getValue(),5,"invalidator first value");

    test.done();
  }
}
