import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saved(link) {
      this.transitionToRoute('links.link', link.get('id'));
    },

    canceled(link) {
      this.transitionToRoute('links.index');
    }
  }
});
