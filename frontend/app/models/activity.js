import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import EmberValidations from 'ember-validations';

export default Model.extend(EmberValidations, {
  name: attr('string'),
  description: attr('string'),
  activityAt: attr('date'),
  durationSecs: attr('number'),
  pin: attr('number', { default: 0 }),
  status: attr('string'),
  completed: attr('boolean'),
  createdAt: attr('date'),

  previousLinks: hasMany('link', { inverse: 'nextActivity', async: true }),
  previousActivities: Ember.computed.mapBy('previousLinks', 'previousActivity'),

  nextLinks: hasMany('link', { inverse: 'previousActivity', async: true }),
  nextActivities: Ember.computed.mapBy('nextLinks', 'nextActivity'),

  parent: belongsTo('activity', { inverse: 'children', async: true }),
  children: hasMany('activity', { inverse: 'parent', async: true }),

  pinStart: Ember.computed.equal('pin', -1),
  pinUndefined: Ember.computed('pin', function() {
    const pin = this.get('pin');
    return !pin || +pin === 0;
  }),
  pinEnd: Ember.computed.equal('pin', 1),

  validations: {
    name: {
      presence: true,
      length: {
        minimum: 4,
        maximum: 255
      }
    },
    description: {
      length: {
        maximum: 32000
      }
    }
  },
});
