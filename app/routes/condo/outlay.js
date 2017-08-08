import Ember from 'ember';

export default Ember.Route.extend({
    ajaxHelper: Ember.inject.service(),

    model(params) {
        let outlayId = params.outlayId;
        return this.get('ajaxHelper').requestJson(`outlays/${outlayId}`);
    }
});
