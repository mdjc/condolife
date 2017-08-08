import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
    ajaxHelper: Ember.inject.service(),
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
           condoStats: this.getCondoStats(condoId),
           billStats: this.getBillsStats(condoId, from, to),
           outlayStats: this.getOutlayStats(condoId, from, to),
           outlays: this.getOutlays(condoId, from, to)
        });        
    },

    getCondoStats(condoId) {
        return this.get('ajaxHelper').requestJson(`/condos/${condoId}/stats`);
    },

    getBillsStats(condoId, from, to) {
        return this.get('ajaxHelper').requestJson(`/condos/${condoId}/bills/stats`,
            {'from': from, 'to': to});
    },

    getOutlayStats(condoId, from, to) {
         return this.get('ajaxHelper')
            .requestJson(`/condos/${condoId}/outlays/stats`, {'from': from, 'to': to});
    },

    getOutlays(condoId, from, to) {
        return this.get('ajaxHelper').requestJson(`/condos/${condoId}/outlays`,
                {'from': from, 'to': to, 'limit':'10','order' : 'desc'});
    }
});
