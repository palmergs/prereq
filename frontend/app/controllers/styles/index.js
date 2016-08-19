import Ember from 'ember';
// import EmberValidations from 'ember-validations';

export default Ember.Controller.extend({
  one: false,
  two: false,
  three: false,
  four: false,
  five: false,
  six: false,

  firstName: null,

  firstNameObserver: Ember.observer('firstName', function() {
    console.log(this.get('firstName'));
  }),

  // validations: {
  //   firstName: {
  //     presence: true,
  //     length: {
  //       minimum: 1,
  //       maximum: 64
  //     }
  //   }
  // },

  icons: [
    'asterisk', 'plus', 'minus', 'eur', 'euro', 'cloud', 'envelope', 'pencil',
    'glass', 'music', 'search', 'heart', 'star', 'star-empty', 'user', 'film',
    'th-large', 'th', 'th-list', 'ok', 'remove', 'zoom-in', 'zoom-out', 'off',
    'signal', 'cog', 'trash', 'home', 'file', 'time', 'road', 'download-alt',
    'download', 'upload', 'inbox', 'play-circle', 'repeat', 'refresh', 'list-alt', 'lock',
    'flag', 'headphones', 'volume-off', 'volume-down', 'volume-up', 'qrcode', 'barcode', 'tag',
    'tags', 'book', 'bookmark', 'print', 'camera', 'font', 'bold', 'italic',
    'text-height', 'text-width', 'align-left', 'align-center', 'align-right',
    'align-justify', 'list', 'indent-left', 'indent-right', 'facetime-video',
    'picture', 'map-marker', 'adjust', 'tint', 'edit', 'share', 'check', 'move',
    'step-backward', 'fast-backward', 'backward', 'play', 'pause', 'stop',
    'forward', 'fast-forward', 'step-forward', 'eject', 'chevron-left', 'chevron-right',
    'plus-sign', 'minus-sign', 'remove-sign', 'ok-sign', 'question-sign', 'info-sign',
    'screenshot', 'remove-circle', 'ok-circle', 'ban-circle', 'arrow-left',
    'arrow-right', 'arrow-up', 'arrow-down', 'share-alt', 'resize-full', 'resize-small',
    'exclamation-sign', 'gift', 'leaf', 'fire', 'eye-open', 'eye-close', 'warning-sign',
    'plane', 'calendar', 'random', 'comment', 'magnet', 'chevron-up', 'chevron-down',
    'retweet', 'shopping-cart', 'folder-close', 'folder-open', 'resize-vertical',
    'resize-horizontal', 'hdd', 'bullhorn', 'bell', 'certificate', 'thumbs-up',
    'thumbs-down', 'hand-right', 'hand-left', 'hand-up', 'hand-down',
    'circle-arrow-right', 'circle-arrow-left', 'circle-arrow-up', 'circle-arrow-down',
    'globe', 'wrench', 'tasks', 'filter', 'briefcase', 'fullscreen', 'dashboard',
    'paperclip', 'heart-empty', 'link', 'phone', 'pushpin', 'usd', 'gbp', 'sort',
    'sort-by-alphabet', 'sort-by-alphabet-alt', 'sort-by-order', 'sort-by-order-alt',
    'sort-by-attributes', 'sort-by-attributes-alt', 'unchecked', 'expand',
    'collapse-down', 'collapse-up', 'log-in', 'flash', 'log-out', 'new-window',
    'record', 'save', 'open', 'saved', 'import', 'export', 'send', 'floppy-disk',
    'floppy-saved', 'floppy-remove', 'floppy-save', 'floppy-open', 'credit-card',
    'transfer', 'cutlery', 'header', 'compressed', 'earphone', 'phone-alt',
    'tower', 'stats', 'sd-video', 'hd-video', 'subtitles', 'sound-stereo', 'sound-dolby',
    'sound-5-1', 'sound-6-1', 'sound-7-1', 'copyright-mark', 'registration-mark',
    'cloud-download', 'cloud-upload', 'tree-conifer', 'tree-deciduous', 'cd',
    'save-file', 'open-file', 'level-up', 'copy', 'paste', 'alert', 'equalizer',
    'king', 'queen', 'pawn', 'bishop', 'knight', 'baby-formula', 'tent', 'blackboard',
    'bed', 'apple', 'erase', 'hourglass', 'lamp', 'duplicate', 'piggy-bank',
    'scissors', 'bitcoin', 'btc', 'xbt', 'yen', 'jpy', 'ruble', 'rub', 'scale',
    'ice-lolly', 'ice-lolly-tasted', 'education', 'option-horizontal', 'option-vertical',
    'menu-hamburger', 'modal-window', 'oil', 'grain', 'sunglasses', 'text-size',
    'text-color', 'text-background', 'object-align-top', 'object-align-bottom',
    'object-align-horizontal', 'object-align-left', 'object-align-vertical',
    'object-align-right', 'triangle-right', 'triangle-left', 'triangle-bottom',
    'triangle-top', 'console', 'superscript', 'subscript', 'menu-left',
    'menu-right', 'menu-down', 'menu-up'
  ],

  progressValue: 1,
  progressValue1: 2,
  progressValue2: 2,
  progressValue3: 2,

  updateProgressValues() {
    setTimeout(() => {
      this.set('progressValue', this.get('progressValue') + parseInt(Math.random() * 2));
      this.set('progressValue1', this.get('progressValue1') + parseInt(Math.random() * 2));
      this.set('progressValue2', this.get('progressValue2') + parseInt(Math.random() * 2));
      this.set('progressValue3', this.get('progressValue3') + parseInt(Math.random() * 2));
      this.updateProgressValues();
    }, 2000);
  },

  names: ['Stefan', 'Miguel', 'Tomster', 'Pluto'],
  name: 'Tomster',

  cities: ['Barcelona', 'London', 'New York', 'Porto'],
  selectedCities: [],

  groupedNumbers: [
    { groupName: "Smalls", options: ["one", "two", "three"] },
    { groupName: "Mediums", options: ["four", "five", "six"] },
    { groupName: "Bigs", options: [
      { groupName: "Fairly big", options: ["seven", "eight", "nine"] },
      { groupName: "Really big", options: [ "ten", "eleven", "twelve" ] },
      "thirteen"]
    },
    "one hundred",
    "one thousand"
  ],

  buttonState: "default",
  downloadState: "primary",

  setAllFalse() {
    this.set('one', false);
    this.set('two', false);
    this.set('three', false);
    this.set('four', false);
    this.set('five', false);
    this.set('six', false);
  },

  onInit: function() {
    this.setAllFalse();
    this.updateProgressValues();
  }.on('init'),

  actions: {
    foo(value) { this.set('name', value); },
    handleKeydown(dropdown, e) {
      if (e.keyCode !== 13) { return; }
      let text = e.target.value;
      if (text.length > 0 && this.get('cities').indexOf(text) === -1) {
        this.get('selectedCities').pushObject(text);
      }
    },
    handleFocus(select) { select.actions.open(); },
    download() { this.set("buttonState", "loading"); },
    downloadPromise() {
      return new Ember.RSVP.Promise((resolve, reject) => {
        setTimeout(() => {
          const val = Math.random();
          if(val > 0.33) {
            this.set('downloadState', 'success');
            resolve("Finished");
          } else {
            this.set('downloadState', 'danger');
            reject("Errored");
          }
        }, 2000);
      });
    },
    submit() { this.setAllFalse(); },
    reset() { this.setAllFalse(); },
    open1() { this.set('one', true); },
    open2() { this.set('two', true); },
    open3() { this.set('three', true); },
    open4() { this.set('four', true); },
    open5() { this.set('five', true); },
    open6() { this.set('six', true); },
  }
});
