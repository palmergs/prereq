import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('styles', function() {
    this.route('forms');
  });
  this.route('activities', function() {
    this.route('new');
    this.route('activity', { path: ":id" });
  });
});

export default Router;
