import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    savedActivity(activity) {
      this.transitionToRoute('activities.activity', activity.get('id'));
    },

    canceledActivity() {
      this.transitionToRoute('activities.index');
    }
  }
});
