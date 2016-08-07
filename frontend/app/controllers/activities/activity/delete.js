import Ember from 'ember';

export default Ember.Controller.extend({
  flashService: Ember.inject.service(),

  actions: {

    cancelDelete() {
      this.transitionToRoute('activities.activity', this.get('model.id'));
    },

    deleteActivity() {
      console.log("about to delete...", this.get('model'));
      this.get('model').destroyRecord().then(() => {
        this.get('flashService').success('Activity was deleted.');
        this.transitionToRoute('activities.index');
      });
    }
  }
});
