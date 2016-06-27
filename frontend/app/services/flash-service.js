import Ember from 'ember';
import FlashMessage from '../models/flash-message';

/*
 * General service to display flash messages.
 *
 * Define on application controller:
 * flashService: Ember.inject.service('flash-service'),
 *
 * Define on application template:
 * <div id="flash">
 *  {{#if (gt flashService.queue.length 0) }}
 *    {{#each flashService.queue as |flash|}}
 *      {{flash-message flash=flash}}
 *    {{/each}}
 *  {{/if}}
 * </div>
 */
export default Ember.Service.extend({
  queue:      Ember.A(),
  isEmpty:    Ember.computed.equal('queue.length', 0),
  defaultTimeout: 3500,

  success(message, timeout=this.get('defaultTimeout')) {
    this._add(message, 'success', timeout);
  },

  info(message, timeout=this.get('defaultTimeout')) {
    this._add(message, 'info', timeout);
  },

  warning(message, timeout=this.get('defaultTimeout')) {
    this._add(message, 'warning', timeout);
  },

  danger(message, timeout=this.get('defaultTimeout')) {
    this._add(message, 'danger', timeout);
  },

  clearMessages() {
    let flashes = this.get('queue');
    Ember.run.next(this, () => {
      flashes.clear();
    });
  },

  errorMessages(errs, message="There was an error.") {
    if(errs && errs.errors && errs.errors.length > 0) {
      for(let i = 0; i < errs.errors.length; ++i) {
        this.warning(errs.errors[i].detail);
      }
    } else {
      if(message) {
        this.warning(message);
      }
    }
  },

  _add(message, type, timeout) {
    let flash = this._newFlashMessage(message, type, timeout);
    this.get('queue').pushObject(flash);
  },

  _newFlashMessage(message, type, timeout) {
    return FlashMessage.create({
      queue: this.get('queue'),
      type: type,
      message: message,
      timeout: timeout });
  }
});
