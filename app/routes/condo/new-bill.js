import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
    ajaxHelper: Ember.inject.service(),
    
    model(params, transition) {
        let condoId = transition.params["condo"].condoId;
        
        return RSVP.hash({
            condoId: condoId,
            apartments: this.apartments(condoId)
        });
    },

    deactivate() {
        this.controller.reset();
    },

    apartments(condoId) {
        return this.get('ajaxHelper').request(`/condos/${condoId}/apartments`);
    }
});
