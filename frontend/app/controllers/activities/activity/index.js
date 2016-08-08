import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saved(activity) {
      this.transitionToRoute('activities.activity', activity.get('id'));
    },

    canceled() {
      this.transitionToRoute('activities.index');
    },

    delete(activity) {
      this.transitionToRoute('activities.activity.delete', activity.get('id'));
    }
  }
});
