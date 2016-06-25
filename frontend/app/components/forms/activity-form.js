import Ember from 'ember';
import TimeMachine from 'ember-time-machine';

export default Ember.Component.extend({

  model: null,
  working: Ember.computed('model', function() {
    const model = this.get('model');
    if(model) {
      const working = TimeMachine.Object.create({ content: model });
      console.log(`model...`);
      console.log(working);
      return working;
    }
  }),

  noUndo: Ember.computed.not('working.canUndo'),
  noRedo: Ember.computed.not('working.canRedo'),

  actions: {
    undo() {
      const working = this.get('working');
      working.undo();
    },
    redo() {
      const working = this.get('working');
      working.redo();
    },
    commit() {
      const working = this.get('working');
      working.commit();
    },
    submit() {
      const working = this.get('working');
      working.commit();

      const model = this.get('model');
      model.save().then(() => {

      }, () => {

      });
    }
  }
});
