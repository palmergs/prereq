import { moduleForModel, test } from 'ember-qunit';

moduleForModel('activity', 'Unit | Model | activity', {
  // Specify the other units that are required for this test.
  needs: [ 'model:link' ]
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(model);
  // let store = this.store();
  // assert.ok(!!model);
});
