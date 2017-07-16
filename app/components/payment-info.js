import Ember from 'ember';

export default Ember.Component.extend({
    imgBig: false,

    proofOfPaymentImg: Ember.computed(function() {
        let bill = this.bill;
        
        if (bill.paymentStatus !== 'PENDING') {
            return `http://localhost:8080/bills/${bill.id}/payment-img`;
        }

        return '';
    }),

    actions: {
        toggleResize() {
          this.toggleProperty('imgBig');
        }
    }
});
