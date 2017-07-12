import Ember from 'ember';

export default Ember.Controller.extend({
    proofOfPaymentImg: '',
    imgBig: false,

    actions: {
        toggleResize: function() {
          this.toggleProperty('imgBig');
        }
    }
});
