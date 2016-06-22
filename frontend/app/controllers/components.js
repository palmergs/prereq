import Ember from 'ember';

export default Ember.Controller.extend({
  one: false,
  two: false,
  three: false,
  four: false,
  five: false,
  six: false,

  setAllFalse() {
    this.set('one', false);
    this.set('two', false);
    this.set('three', false);
    this.set('four', false);
    this.set('five', false);
    this.set('six', false);
  },

  onInit: function() {
    this.setAllFalse();
  }.on('init'),

  actions: {
    submit() { this.setAllFalse(); },
    reset() { this.setAllFalse(); },
    open1() { this.set('one', true); },
    open2() { this.set('two', true); },
    open3() { this.set('three', true); },
    open4() { this.set('four', true); },
    open5() { this.set('five', true); },
    open6() { this.set('six', true); },
  }
});
