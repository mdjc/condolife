import Ember from 'ember';

export default Ember.Route.extend({
    ajaxHelper: Ember.inject.service(),

    model(params, transition) {       
        let condoId = transition.params["condo"].condoId;
        return this.get('ajaxHelper').requestJson(`condos/${condoId}/aparatmentPastDueDebts`);
    }
});
