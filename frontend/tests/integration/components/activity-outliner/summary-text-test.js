import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('activity-outliner/summary-text', 'Integration | Component | activity outliner/summary text', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{activity-outliner/summary-text}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#activity-outliner/summary-text}}
      template block text
    {{/activity-outliner/summary-text}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
