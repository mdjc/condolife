import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
    ajax: Ember.inject.service(),
    session: Ember.inject.service(),
    dateUtils: Ember.inject.service(),

    model(params, transition) {       
        let condoId = transition.params["condo"].condoId;

        var dateUtils = this.get('dateUtils');
        var today = new Date();
        var beginningOfMonth = dateUtils.beginningOfMonth(today);
        var endOfMonth = dateUtils.endOfMonth(today);
        var from = dateUtils.toStr(beginningOfMonth);
        var to = dateUtils.toStr(endOfMonth);

        return RSVP.hash({
           cSts: this.getCondoStats(condoId),
           billSts: this.getBillsStats(condoId, from, to),
           os: this.getOutlayStats(condoId, from, to),
           outlays: this.getOutlays(from, to)
        });        
    },

    getCondoStats(condoId) {
        return this.get('ajax')
            .request(`/condos/${condoId}/stats`, {
                crossDomain: true,
                xhrFields: { withCredentials: true }
            });
    },

    getBillsStats(condoId, from, to) {
         return this.get('ajax')
            .request(`/condos/${condoId}/bills/stats`, {
                crossDomain: true,
                xhrFields: { withCredentials: true },
                data: {'from': from, 'to': to}
            });
    },

    getOutlayStats(condoId, from, to) {
         return this.get('ajax')
            .request(`/condos/${condoId}/outlays/stats`, {
                crossDomain: true,
                xhrFields: { withCredentials: true },
                data: {'from': from, 'to': to}
            });
    },

    getOutlays(from, to) {
        return this.get('store').query('outlay', 
            {'from': from, 
            'to': to, 
            'limit':'10',
            'order' : 'desc'});
    }
});
