import Ember from 'ember';

export default Ember.Component.extend({
  flashService: Ember.inject.service('flash-service'),

  tagName: 'li',
  classNames: [ 'activity-row' ],

  actions: {
    setIsEditing() {
      this.set('isEditing', true);
    },

    submit() {
      console.log("in save?");
      const model = this.get('model');
      model.validate().then(() => {
        this.get('model').save().then((result) => {
          this.set('isEditing', false);
          this.get('flashService').success(`Activity "${ result.get('name') }" saved.`);
          this.sendAction('saved', result);
        }, (errs) => {
          this.get('flashService').errorMessages(errs);
        });
      }).catch((validations) => {
        console.log("In validations", validations);
        this.get('flashService').warning("Unable to save activity.");
      });
    },

    delete() {
      this.set('isEditing', false);
      const model = this.get('model');
      model.deleteRecord();
      this.sendAction('deleted', model);
    },

    cancel() {
      this.set('isEditing', false);
      const model = this.get('model');
      model.rollbackAttributes();
      this.sendAction('canceled', model);
    }
  }
});
