import { moduleFor, test } from 'ember-qunit';
// import { moduleForModel, test } from 'ember-qunit';

// moduleForModel('flash-message', 'Unit | Model | flash message', {
//   // Specify the other units that are required for this test.
//   needs: []
// });

moduleFor('model:flash-message', 'Unit | Model | flash message');

test('it exists', function(assert) {
  // let model = this.subject();
  // let store = this.store();

  const model = this.subject();
  assert.ok(!!model);
});
