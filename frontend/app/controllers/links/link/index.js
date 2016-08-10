import Ember from 'ember';

export default Ember.Controller.extend({

  lat: 45.519743,
  lng: -122.680522,
  zoom: 10,

  emberConfLocation: [45.528298, -122.662986],
  hotel: [45.530891, -122.655504],

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
