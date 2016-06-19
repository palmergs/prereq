import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  description: attr('string'),
  createdAt: attr('date'),

  previousLinks: hasMany('link', { inverse: 'nextActivity', async: true }),
  nextLinks: hasMany('link', { inverse: 'previousActivity', async: true })
});
