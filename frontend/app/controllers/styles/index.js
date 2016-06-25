import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  one: false,
  two: false,
  three: false,
  four: false,
  five: false,
  six: false,

  firstName: null,

  firstNameObserver: Ember.observer('firstName', function() {
    console.log(this.get('firstName'));
  }),

  validations: {
    firstName: {
      presence: true,
      length: {
        minimum: 1,
        maximum: 64
      }
    }
  },

  progressValue: 1,
  progressValue1: 2,
  progressValue2: 2,
  progressValue3: 2,

  updateProgressValues() {
    setTimeout(() => {
      this.set('progressValue', this.get('progressValue') + parseInt(Math.random() * 2));
      this.set('progressValue1', this.get('progressValue1') + parseInt(Math.random() * 2));
      this.set('progressValue2', this.get('progressValue2') + parseInt(Math.random() * 2));
      this.set('progressValue3', this.get('progressValue3') + parseInt(Math.random() * 2));
      this.updateProgressValues();
    }, 2000);
  },

  names: ['Stefan', 'Miguel', 'Tomster', 'Pluto'],
  name: 'Tomster',

  cities: ['Barcelona', 'London', 'New York', 'Porto'],
  selectedCities: [],

  groupedNumbers: [
    { groupName: "Smalls", options: ["one", "two", "three"] },
    { groupName: "Mediums", options: ["four", "five", "six"] },
    { groupName: "Bigs", options: [
      { groupName: "Fairly big", options: ["seven", "eight", "nine"] },
      { groupName: "Really big", options: [ "ten", "eleven", "twelve" ] },
      "thirteen"]
    },
    "one hundred",
    "one thousand"
  ],

  buttonState: "default",
  downloadState: "primary",

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
    this.updateProgressValues();
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
    handleFocus(select) { select.actions.open(); },
    download() { this.set("buttonState", "loading"); },
    downloadPromise() {
      return new Ember.RSVP.Promise((resolve, reject) => {
        setTimeout(() => {
          const val = Math.random();
          if(val > 0.33) {
            this.set('downloadState', 'success');
            resolve("Finished");
          } else {
            this.set('downloadState', 'danger');
            reject("Errored");
          }
        }, 2000);
      });
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
