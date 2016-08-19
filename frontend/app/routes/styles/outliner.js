import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('activity', { title: 'A New Activity'});
  }
});
