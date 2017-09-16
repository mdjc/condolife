import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
    ajaxHelper: Ember.inject.service(),

    model() {    
        let parentRouteModel = this.modelFor('condo');

        return RSVP.hash({
           condo: parentRouteModel.condo,
           apartments: this.getApartments(parentRouteModel.condo.id)
        });
    },

    getApartments(condoId) {
        return this.get('ajaxHelper').requestJson(`condos/${condoId}/apartments`);
    }
});
