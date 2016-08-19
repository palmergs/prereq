import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'i',
  classNames: [ 'glyphicon'],
  classNameBindings: [ 'iconClass' ],
  iconClass: Ember.computed('icon', function() {
    const icon = this.get('icon');
    if(icon) {
      return `glyphicon-${ icon.toString() }`;
    }
  })
});
