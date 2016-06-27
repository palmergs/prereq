import Ember from 'ember';

export default Ember.Object.extend({

  queue:      null,
  timeout:    2000,
  message:    null,
  type:       'info',

  isSuccess:  Ember.computed.equal('type', 'success'),
  isInfo:     Ember.computed.equal('type', 'info'),
  isWarning:  Ember.computed.equal('type', 'warning'),
  isDanger:   Ember.computed.equal('type', 'danger'),

  destroyLater: function() {
    Ember.run.later(this, '_destroyMessage', this.get('timeout'));
  }.on('init'),

  destroyMessage() {
    this._destroyMessage();
  },

  _destroyMessage() {
    Ember.run.next(this, () => {
      this.destroy();
      this.get('queue').removeObject(this);
    });
  }
});
