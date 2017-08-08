import Ember from 'ember';
import Env from 'condolife/config/environment';

export default Ember.Component.extend({
    proofOfPaymentImg: Ember.computed(function() {
        let bill = this.bill;
        
        if (bill.paymentStatus !== 'PENDING') {
            return `${Env.RestAPIHost}/condoBills/${bill.id}/payment-img`;
        }

        return '';
    })
});
