import Ember from 'ember';

export default Ember.Component.extend({
  activitiesStore: Ember.inject.service(),

  actions: {
    lookupPreviousActivities(query) {
      return this.get('activitiesStore').search(query);
    },

    lookupNextActivities(query) {
      return this.get('activitiesStore').search(query);
    },

    setPreviousActivity(activity) {
      this.set('model.previousActivity', activity);
    },

    setNextActivity(activity) {
      this.set('model.nextActivity', activity);
    },

    cancel(link) {
      link.rollbackAttributes();
      this.sendAction('canceled');
    },

    delete(link) {
      this.sendAction('delete', link);
    },

    submit() {
      const model = this.get('model');
      model.validate().then(() => {
        model.save().then((result) => {
          this.sendAction('saved', result);
          this.get('flashService').success(`Link between "${ result.get('previousActivity.name') }" and "${ result.get('nextActivity.name') }" saved.`);
        }, (errs) => {
          console.log("in errors...");
          console.log(errs);
          this.get('flashService').errorMessages(errs);
        }).catch((validations) => {
          console.log("in validations...");
          console.log(validations);
          this.get('flashService').warning("Unable to save link.");
        });
      });
    }
  }
});
