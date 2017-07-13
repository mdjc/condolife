import Ember from 'ember';

export default Ember.Controller.extend({
    ajax: Ember.inject.service(),
    proofOfPaymentImg: '',
    imgBig: false,
    errorMsg: '',
    successMsg: '',

    patchBill(paymentStatus, successMsg) {
        let self = this; 
        let billId = this.get('model.id');
        console.log('billId');  
        self.get('ajax').patch(`bills/${billId}/payment`, {
            crossDomain: true,
            xhrFields: { withCredentials: true },
            data: paymentStatus,
            contentType: 'text/plain',
            dataType: "text"
        }).then(() => {
            self.set("successMsg", successMsg);
            Ember.run.later(() => self.set("successMsg", ""), 3000);
            Ember.run.later(() => self.transitionToRoute('condo.unconfirmed-bills'), 3000);
        }).catch(function() {
            self.set("errorMsg", "Error inesperado ");
            Ember.run.later(() => self.set("errorMsg", ""), 3000);
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
