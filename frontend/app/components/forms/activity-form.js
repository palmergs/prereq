import Ember from 'ember';
// import TimeMachine from 'ember-time-machine';
// import EmberValidations from 'ember-validations';

export default Ember.Component.extend({
  flashService: Ember.inject.service('flash-service'),

  model: null,

  errors: null,

  actions: {
    cancel() {
      const model = this.get('model');
      model.rollbackAttributes();
      this.sendAction('canceled');
    },

    deleteRequested() {
      this.sendAction('delete');
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
        }).catch((validations) => {
          console.log("in validations...");
          console.log(validations);
          this.get('flashService').warning("Unable to save activity.");
        });
      });
    }
  }
});
