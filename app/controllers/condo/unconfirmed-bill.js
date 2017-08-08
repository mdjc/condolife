import Ember from 'ember';

export default Ember.Controller.extend({
    ajaxHelper: Ember.inject.service(),
    proofOfPaymentImg: '',
    imgBig: false,
    errorMsg: '',
    successMsg: '',

    patchBill(paymentStatus, successMsg) {
        let self = this; 
        let billId = this.get('model.id'); 
        self.get('ajaxHelper').patch(`condoBills/${billId}/payment`, 'text/plain', "text", paymentStatus)
            .then(() => {
                self.set("successMsg", successMsg);
                Ember.run.later(() => self.set("successMsg", ""), 3000);
                Ember.run.later(() => self.transitionToRoute('condo.unconfirmed-bills'), 3000);
            }).catch((error) => {
                self.handleError(error);
            });     
    },

    actions: {
        toggleResize() {
          this.toggleProperty('imgBig');
        },

        confirmBill() {
            this.patchBill("PAID_CONFIRMED", "Factura Confirmada");
        },

        rejectBill() {
             this.patchBill("REJECTED", "Factura Rechazada");
        }
    }
});
