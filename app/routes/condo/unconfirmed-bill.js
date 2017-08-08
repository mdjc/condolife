import Ember from 'ember';

export default Ember.Route.extend({
    ajaxHelper: Ember.inject.service(),

    model(params) {
        return this.get('ajaxHelper').requestJson(`condoBills/${params.billId}`);    
    }
});
