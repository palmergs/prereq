import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  description: attr('string'),
  status: attr('string'),
  completed: attr('boolean'),
  createdAt: attr('date'),

  previousLinks: hasMany('link', { inverse: 'nextActivity', async: true }),
  previousActivities: Ember.computed.mapBy('previousLinks', 'previousActivity'),

  nextLinks: hasMany('link', { inverse: 'previousActivity', async: true }),
  nextActivities: Ember.computed.mapBy('nextLinks', 'nextActivity'),

  parent: belongsTo('activity', { inverse: 'children', async: true }),
  children: hasMany('activity', { inverse: 'parent', async: true })
});
