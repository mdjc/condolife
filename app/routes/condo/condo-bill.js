import Ember from 'ember';

export default Ember.Route.extend({
    ajaxHelper: Ember.inject.service(),
    
    model(params, transition){
        let condoId = transition.params.condoId;
        let billId = params.billId;

        return this.get('ajaxHelper').requestJson(`/condos/${condoId}/condoBills/${billId}`); 
    }
});
