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
           bs: this.getBuildingStats(buildingId),
           payments: this.getPayments(buildingId)
        });        
    },

    getBuildingStats(buildingId) {
        return this.get('ajax')
            .request('/buildingStats', {
                crossDomain: true,
                xhrFields: { withCredentials: true },
                data: {'buildingId':buildingId}
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
