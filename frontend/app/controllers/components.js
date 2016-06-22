import Ember from 'ember';

export default Ember.Controller.extend({
  one: false,
  two: false,
  three: false,
  four: false,
  five: false,
  six: false,

  progressValue: 1,
  progressValue1: 2,
  progressValue2: 2,
  progressValue3: 2,

  names: ['Stefan', 'Miguel', 'Tomster', 'Pluto'],
  name: 'Tomster',

  cities: ['Barcelona', 'London', 'New York', 'Porto'],
  selectedCities: [],

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
    foo(value) { this.set('name', value); },
    handleKeydown(dropdown, e) {
      if (e.keyCode !== 13) { return; }
      let text = e.target.value;
      if (text.length > 0 && this.get('cities').indexOf(text) === -1) {
        this.get('selectedCities').pushObject(text);
      }
    },
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
