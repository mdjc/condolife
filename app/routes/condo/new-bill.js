import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
    ajax: Ember.inject.service(),
    
    model(params, transition) {
        let condoId = transition.params["condo"].condoId;
        
        return RSVP.hash({
            condoId: condoId,
            apts: this.apartments(condoId)
        });
    },

    deactivate() {
        this.controller.reset();
    },

    apartments(condoId) {
        return this.get('ajax')
            .request(`/condos/${condoId}/apartments`, {
                crossDomain: true,
                xhrFields: { withCredentials: true }
            });
    }
});
