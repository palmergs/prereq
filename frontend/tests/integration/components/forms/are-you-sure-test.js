import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('forms/are-you-sure', 'Integration | Component | forms/are you sure', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{forms/are-you-sure}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#forms/are-you-sure}}
      template block text
    {{/forms/are-you-sure}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
