/* jshint node: true */
var contentSecurityPolicy = {
  'default-src':  "'none'",
  'script-src':   "'self'",
  'font-src':     "'self' res.cloudinary.com",
  'connect-src':  "'self' localhost:*",
  // 'connect-src':  "'self' 172.16.42.5:*",
  // 'img-src':      "'self' res.cloudinary.com data:",
  'style-src':    "'self' 'unsafe-inline' 'unsafe-eval'",
  'media-src':    "'self'"
};

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'frontend',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    i18n: {
      defaultLocale: 'en'
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        Function: true,
        String: true,
        Array: true,
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    ENV.apiHost = 'http://localhost:3070';
    ENV.contentSecurityPolicy = contentSecurityPolicy;

    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
