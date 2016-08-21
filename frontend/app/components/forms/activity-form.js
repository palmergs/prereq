import Ember from 'ember';
// import TimeMachine from 'ember-time-machine';
// import EmberValidations from 'ember-validations';

export default Ember.Component.extend({
  flashService: Ember.inject.service('flash-service'),
  activitiesStore: Ember.inject.service(),

  model: null,

  errors: null,

  pinButtons: [
    { name: 'Start At', value: -1, icon: 'step-backward' },
    { name: 'End At', value: 1, icon: 'step-forward' }
  ],

  actions: {
    lookupActivities(query) {
      return this.get('activitiesStore').search(query, this.get('model'));
    },

    setParentActivity(activity) {
      this.set('model.parent', activity);
    },

    setPin(pin) {
      console.log("Setting pin", pin, +pin, parseInt(pin), this.get('model.pinUndefined'));
      pin ? this.set('model.pin', parseInt(pin)) : this.set('model.pin', 0);
      console.log("After set", this.get('model.pin'), this.get('model.pinStart'), this.get('model.pinUndefined'))
    },

    cancel(activity) {
      activity.rollbackAttributes();
      this.sendAction('canceled', activity);
    },

    delete(activity) {
      this.sendAction('delete', activity);
    },

    submit() {
      const model = this.get('model');
      model.validate().then(() => {
        model.save().then((result) => {
          this.sendAction('saved', result);
          this.get('flashService').success(`Activity "${ result.get('name') }" saved.`);
        }, (errs) => {
          console.log("in errors...");
          console.log(errs);
          this.get('flashService').errorMessages(errs);
        });
      }).catch((validations) => {
        console.log("in validations...");
        console.log(validations);
        this.get('flashService').warning("Unable to save activity.");
      });
    }
  }
});
