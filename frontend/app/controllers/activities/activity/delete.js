import Ember from 'ember';

export default Ember.Controller.extend({
  flashService: Ember.inject.service(),

  actions: {

    cancel(activity) {
      this.transitionToRoute('activities.activity', activity);
    },

    delete(activity) {
      activity.destroyRecord().then(() => {
        this.get('flashService').success('Activity was deleted.');
        this.transitionToRoute('activities.index');
      });
    }
  }
});
