import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('styles', function() {
    this.route('forms');
  });
  this.route('activities');
});

export default Router;
