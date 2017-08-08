import Ember from 'ember';
import Env from 'condolife/config/environment';

export default Ember.Route.extend({
    session: Ember.inject.service(),
    ajaxHelper: Ember.inject.service(),

    model(params) {
        return this.get('ajaxHelper')
            .requestJson(`condoBills/${params.billId}`);
    },

    setupController(controller, model) {
        this._super(controller, model);

        if (model.paymentStatus === 'REJECTED') {
            controller.set('proofOfPaymentImgSrc', 
            `${Env.RestAPIHost}/condoBills/${model.id}/payment-img`);
        }

        if (model.paymentMethod) {
            controller.set('paymentMethod', model.paymentMethod);
        }
    },

    deactivate() {
        this.controller.resetFields();
    }
});
