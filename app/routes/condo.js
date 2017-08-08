import Ember from 'ember';

export default Ember.Route.extend({
    ajaxHelper: Ember.inject.service(),

    model(params) {    
        let condoId = params.condoId;
        return this.get('ajaxHelper').requestJson(`condos/${condoId}`);
    }
});
