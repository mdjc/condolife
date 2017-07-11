import Ember from 'ember';

export default Ember.Route.extend({
    setupController: function(controller, model) {
        this._super(controller, model);

        if (model.get('paymentStatus') === 'REJECTED') {
            controller.set('proofOfPaymentImgSrc', `http://localhost:8080/bills/${model.id}/payment-img`);
        }

        if (model.get('paymentMethod')) {
            controller.set('paymentMethod', model.get('paymentMethod'));
        }
    },

    deactivate() {
        this.controller.resetFields();
    }
});
