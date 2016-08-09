import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  search(query) {
    return this.get('store').query('activity', { q: query });
  }
});
