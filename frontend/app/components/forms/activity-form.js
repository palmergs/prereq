import Ember from 'ember';
// import TimeMachine from 'ember-time-machine';
// import EmberValidations from 'ember-validations';

export default Ember.Component.extend({
  flashService: Ember.inject.service('flash-service'),
  activitiesStore: Ember.inject.service(),

  model: null,

  errors: null,

  actions: {
    lookupActivities(query) {
      return this.get('activitiesStore').search(query, this.get('model'));
    },

    setParentActivity(activity) {
      this.set('model.parent', activity);
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
