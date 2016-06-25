import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('forms/activity-form', 'Integration | Component | forms/activity form', {
  integration: true
});

test('it renders warning message without model', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{forms/activity-form}}`);
  assert.equal(this.$().text().trim(), 'No activity model found.');

});
