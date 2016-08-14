import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  search(query, context) {
    const params = { q: query };
    if(context) { params.exc = context.get('id'); }
    return this.get('store').query('activity', params);
  }
});
