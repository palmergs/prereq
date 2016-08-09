import Ember from 'ember';

export default Ember.Controller.extend({
  flashService: Ember.inject.service(),

  actions: {

    cancel(link) {
      this.transitionToRoute('links.link', link);
    },

    delete(link) {
      link.destroyRecord().then(() => {
        this.get('flashService').success('Link was deleted.');
        this.transitionToRoute('links.index');
      });
    }
  }
});
