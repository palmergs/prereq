import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    submit() {
      this.set('one', false);
      this.set('two', false);
      this.set('three', false);
      this.set('four', false);
      this.set('five', false);
      this.set('six', false);
    },
    toggle1() {
      this.toggleProperty('one');
    },
    toggle2() {
      this.toggleProperty('two');
    },
    toggle3() {
      this.toggleProperty('three');
    },
    toggle4() {
      this.toggleProperty('four');
    },
    toggle5() {
      this.toggleProperty('five');
    },
    toggle6() {
      this.toggleProperty('six');
    },
  }
});
