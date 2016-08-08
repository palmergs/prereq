import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    lookupPreviousActivities(query) {
      console.log("previous", query);
    }
  }
});
