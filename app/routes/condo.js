import Ember from 'ember';

export default Ember.Route.extend({
    session: Ember.inject.service(),

    model(params) {    
        let condoId = params.condoId;
        this.get('session').setCurrentCondo(condoId);
        return this.get('store').findRecord('condo', condoId);
    }
});
