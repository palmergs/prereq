import Ember from 'ember';

export default Ember.Controller.extend({
  flashService: Ember.inject.service('flash-service')
});
