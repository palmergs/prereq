import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    name: {
      refreshModel: true
    }
  },
  model(params) {
    return this.store.query('activity', params);
  }
});
