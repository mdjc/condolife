import Ember from 'ember';

export default Ember.Route.extend({
    session: Ember.inject.service(),
    ajaxHelper: Ember.inject.service(),

    model(params, transition) {
       let condoId = transition.params["condo"].condoId;
       let username = this.get('session').currentUsername;
       let billId = params.billId;

        return this.get('ajaxHelper')
            .requestJson(`/condos/${condoId}/residents/${username}/bills/${billId}`);
    },

    setupController(controller, model) {
        this._super(controller, model);

        if (model.paymentStatus === 'REJECTED') {
            controller.set('proofOfPaymentImgSrc', `http://localhost:8080/bills/${model.id}/payment-img`);
        }

        if (model.paymentMethod) {
            controller.set('paymentMethod', model.paymentMethod);
        }
    },

    deactivate() {
        this.controller.resetFields();
    }
});
