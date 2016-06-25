import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import EmberValidations from 'ember-validations';

export default Model.extend(EmberValidations, {
  description: attr('string'),

  nextActivity: belongsTo('activity', { inverse: 'previousLinks', async: true }),
  previousActivity: belongsTo('activity', { inverse: 'nextLinks', async: true }),

  validations: {
    description: {
      length: {
        maximum: 32000
      }
    }
  }
});
