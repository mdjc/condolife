import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import RSVP from 'rsvp';
import AjaxErrorsMixin from './mixins/ajax-errors-support';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

Ember.Route.reopen(AjaxErrorsMixin);
Ember.Controller.reopen(AjaxErrorsMixin);

RSVP.on('error', function(error) {
    if (error && error.message == "TransitionAborted") {
        return;
    }

    Ember.assert(error, false);
});

loadInitializers(App, config.modulePrefix);

export default App;
