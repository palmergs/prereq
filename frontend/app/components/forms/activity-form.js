import Ember from 'ember';
// import TimeMachine from 'ember-time-machine';
// import EmberValidations from 'ember-validations';

export default Ember.Component.extend({
  flashService: Ember.inject.service('flash-service'),

  model: null,
  // working: Ember.computed('model', function() {
  //   const model = this.get('model');
  //   if(model) {
  //     const working = TimeMachine.Object.create({ content: model });
  //     console.log(`model...`);
  //     console.log(working);
  //     return working;
  //   }
  // }),

  errors: null,

  // noUndo: Ember.computed.not('working.canUndo'),
  // noRedo: Ember.computed.not('working.canRedo'),

  actions: {
    // undo() {
    //   const working = this.get('working');
    //   working.undo();
    // },
    // redo() {
    //   const working = this.get('working');
    //   working.redo();
    // },
    // commit() {
    //   const working = this.get('working');
    //   working.commit();
    // },
    cancel() {
      const model = this.get('model');
      model.rollbackAttributes();
      this.sendAction('canceled');
    },

    submit() {
      // const working = this.get('working');
      // working.commit();

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
