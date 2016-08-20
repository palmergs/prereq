import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    saved(link) {
      this.transitionToRoute('links.link', link.get('id'));
    },

    canceled() {
      this.transitionToRoute('links.index');
    },

    delete(link) {
      this.transitionToRoute('links.link.delete', link.get('id'));
    }
  }
});
