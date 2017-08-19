import Ember from 'ember';

export default Ember.Controller.extend({
    ajaxHelper: Ember.inject.service(),
    proofOfPaymentImg: '',
    imgBig: false,
    errorMsg: '',
    successMsg: '',
    loadingConfirm: false,
    loadingReject: false,

    patchBill(paymentStatus, successMsg) {
        let self = this; 
        let billId = this.get('model.id'); 
        
        self.get('ajaxHelper').patch(`condoBills/${billId}/payment`, 'text/plain', "text", paymentStatus)
            .then(() => {
                Ember.run.later(() => {
                    self.set('loadingConfirm', false);
                    self.set('loadingReject', false);
                    self.set('successMsg', successMsg);
                }, 500);
                Ember.run.later(() => self.transitionToRoute('condo.unconfirmed-bills'), 3000);
                Ember.run.later(() => self.set("successMsg", ""), 3500);
            }).catch((error) => {
                self.set('loadingConfirm', false);
                self.set('loadingReject', false);
                self.handleError(error);
            });     
    },

    actions: {
        toggleResize() {
          this.toggleProperty('imgBig');
        },

        confirmBill() {
            this.set('loadingConfirm', true);
            this.patchBill("PAID_CONFIRMED", "Factura Confirmada");
        },

        rejectBill() {
            this.set('loadingReject', true);
            this.patchBill("REJECTED", "Factura Rechazada");
        },

        back() {
            history.back();
        }
    }
});
