import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
    ajaxHelper: Ember.inject.service(),
    session: Ember.inject.service(),

    model(params) {    
        let condoId = params.condoId;

        return RSVP.hash({
            condo: this.getCondo(condoId),
            apartment: this.getApartmentIfResident()
        });
    },

    getCondo(condoId) {
        return this.get('ajaxHelper').requestJson(`condos/${condoId}`);
    },

    getApartmentIfResident() {
        let role = this.get('session').currentUserRole;

        if (role === 'RESIDENT') {
            let username = this.get('session').currentUsername;
            return this.get('ajaxHelper').requestJson(`apartments/${username}`);
        }

        return "";
    }
});
