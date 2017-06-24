import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
    ajax: Ember.inject.service(),
    session: Ember.inject.service(),
    dateUtils: Ember.inject.service(),

    model(params) {
        let buildingId = params.buildingId;
        this.get('session').setCurrentBuilding(buildingId);

        return RSVP.hash({
           b: this.getBuilding(buildingId),
           bs: this.getBuildingStats(buildingId),
           payments: this.getPayments(buildingId)
        });        
    },

    getBuilding(id) {
        return this.store.findRecord('building', id);
    },

    getBuildingStats(buildingId) {
        return this.get('ajax')
            .request(`/buildings/${buildingId}/stats`, {
                crossDomain: true,
                xhrFields: { withCredentials: true }
            });
    },

    getPayments() {
        var dateUtils = this.get('dateUtils');
        var today = new Date();
        var beginningOfMonth = dateUtils.beginningOfMonth(today);
        var endOfMonth = dateUtils.endOfMonth(today);

        return this.get('store').query('payment', 
            {'from': dateUtils.toStr(beginningOfMonth), 
            'to': dateUtils.toStr(endOfMonth), 
            'limit':'10',
            'order' : 'desc'});
    }
});
