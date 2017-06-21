import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
     ajax: Ember.inject.service(),
     model(params) {
        return RSVP.hash({
           bs: this.getBuildingStats(params)
        });        
     },

     getBuildingStats(params) {
        return this.get('ajax')
            .request('/buildingStats', {
                crossDomain: true,
                xhrFields: { withCredentials: true },
                data: {'buildingId':params.buildingId}
            });
     }
});
