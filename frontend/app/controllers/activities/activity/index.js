import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    confirmDelete() {
      this.transitionToRoute('activities.activity.delete', this.get('model.id'));
    },
    
    savedActivity(activity) {
      this.transitionToRoute('activities.activity', activity.get('id'));
    },

    canceledActivity() {
      this.transitionToRoute('activities.index');
    },

    delete() {
      this.transitionToRoute('activities.activity.delete', this.get('model.id'));
    }
  }
});
