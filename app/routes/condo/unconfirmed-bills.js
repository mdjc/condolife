import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
    condoId: '',

    model(params, transition) {
        return RSVP.hash({
            condoId: transition.params["condo"].condoId
        });
    },

    setupController: function(controller, model) {
        this._super(controller, model);
        controller.load();
    }
});
