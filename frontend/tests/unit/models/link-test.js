import { moduleForModel, test } from 'ember-qunit';

moduleForModel('link', 'Unit | Model | link', {
  // Specify the other units that are required for this test.
  needs: [ 'model:activity' ]
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(model);
  // let store = this.store();
  // assert.ok(!!model);
});
