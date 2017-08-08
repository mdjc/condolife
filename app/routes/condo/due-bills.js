import Ember from 'ember';

export default Ember.Route.extend({
    ajaxHelper: Ember.inject.service(),
    session: Ember.inject.service(),

    model(params, transition) {       
        let condoId = transition.params["condo"].condoId;
        let username = this.get('session').currentUsername;

        return this.get('ajaxHelper').requestJson(`/condos/${condoId}/residents/${username}/bills`, 
            {paymentStatus: ['PENDING', 'REJECTED']});
    }
});
