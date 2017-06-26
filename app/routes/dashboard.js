import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
    ajax: Ember.inject.service(),
    session: Ember.inject.service(),
    dateUtils: Ember.inject.service(),

    model(params) {
        let buildingId = params.buildingId;
        this.get('session').setCurrentBuilding(buildingId);

        var dateUtils = this.get('dateUtils');
        var today = new Date();
        var beginningOfMonth = dateUtils.beginningOfMonth(today);
        var endOfMonth = dateUtils.endOfMonth(today);
        var from = dateUtils.toStr(beginningOfMonth);
        var to = dateUtils.toStr(endOfMonth);

        return RSVP.hash({
           b: this.getBuilding(buildingId),
           bs: this.getBuildingStats(buildingId),
           ps: this.getPaymentStats(buildingId, from, to),
           os: this.getOutlayStats(buildingId, from, to),
           payments: this.getPayments(from, to),
           outlays: this.getOutlays(from, to)
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

    getPaymentStats(buildingId, from, to) {
         return this.get('ajax')
            .request(`/buildings/${buildingId}/payments/stats`, {
                crossDomain: true,
                xhrFields: { withCredentials: true },
                data: {'from': from, 'to': to}
            });
    },

    getOutlayStats(buildingId, from, to) {
         return this.get('ajax')
            .request(`/buildings/${buildingId}/outlays/stats`, {
                crossDomain: true,
                xhrFields: { withCredentials: true },
                data: {'from': from, 'to': to}
            });
    },

    getPayments(from, to) {
        return this.get('store').query('payment', 
            {'from': from, 
            'to': to, 
            'limit':'10',
            'order' : 'desc'});
    },

    getOutlays(from, to) {
        return this.get('store').query('outlay', 
            {'from': from, 
            'to': to, 
            'limit':'10',
            'order' : 'desc'});
    }
});
