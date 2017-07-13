import Ember from 'ember';

export default Ember.Route.extend({
    setupController: function(controller, model) {
        this._super(controller, model);
        
        if (model.get('paymentStatus') !== 'PENDING') {
            controller.set('proofOfPaymentImg', `http://localhost:8080/bills/${model.id}/payment-img`);
        }
    }
});
