import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saved(activity) {
      this.transitionToRoute('activities.activity', activity.get('id'));
    },

    canceled(activity) {
      this.transitionToRoute('activities.index');
    }
  }
});
