import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    cancelDelete() {
      this.transitionToRoute('activities.activity', this.get('model.id'));
    },

    deleteActivity() {
      this.transitionToRoute('activities.index');  
    }
  }
});
