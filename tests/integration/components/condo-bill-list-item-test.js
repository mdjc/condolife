import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('condo-bill-list-item', 'Integration | Component | condo bill list item', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{condo-bill-list-item}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#condo-bill-list-item}}
      template block text
    {{/condo-bill-list-item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
