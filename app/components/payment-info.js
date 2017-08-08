import Ember from 'ember';

export default Ember.Component.extend({
    proofOfPaymentImg: Ember.computed(function() {
        let bill = this.bill;
        
        if (bill.paymentStatus !== 'PENDING') {
            return `http://localhost:8080/condoBills/${bill.id}/payment-img`;
        }

        return '';
    })
});
