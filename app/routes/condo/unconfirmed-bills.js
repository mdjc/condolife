import Ember from 'ember';

export default Ember.Route.extend({
    model() { 
        return this.get('store').query('condo-bill', {paymentStatus: ['PAID_AWAITING_CONFIRMATION']});
    }
});
