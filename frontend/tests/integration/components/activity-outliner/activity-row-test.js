import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('activity-outliner/activity-row', 'Integration | Component | activity outliner/activity row', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{activity-outliner/activity-row}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#activity-outliner/activity-row}}
      template block text
    {{/activity-outliner/activity-row}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
