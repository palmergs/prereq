import Ember from 'ember';

export default Ember.Component.extend({
  tagName:    'div',
  classNames: [ 'form-group', 'btn-group' ],
  attributeBindings: [ 'dataToggle:data-toggle' ],
  dataToggle: 'buttons',
  current: null,

  actions: {
    clicked(value) {
      if(value === this.get('current')) {
        this.set('current', null);
      } else {
        this.set('current', value);
      }
      this.sendAction('selected', this.get('current'));
    }
  }
});
