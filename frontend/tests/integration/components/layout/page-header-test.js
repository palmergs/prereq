import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('layout/page-header', 'Integration | Component | layout/page header', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{layout/page-header}}`);
  //let result = this.$().text().trim();
  //assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#layout/page-header}}
      template block text
    {{/layout/page-header}}
  `);
  
  //result = this.$().text().trim();
  //assert.equal(this.$().text().trim(), 'template block text');

  assert.expect(0);
});
