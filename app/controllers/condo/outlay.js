import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service(),
    ajax: Ember.inject.service(),
    outlayLogController: Ember.inject.controller('condo/outlay-log'),
    deleteModalVisible: false,

    isResident: Ember.computed('session.currentUserRole', function() {
        return this.get('session').currentUserRole === 'RESIDENT';
    }),

    receiptImg: Ember.computed('model', function() {
        let outlay = this.get('model');
        return `http://localhost:8080/outlays/${outlay.id}/receipt-img`;
    }),

    actions: {
        deleteReceipt() {
            let self = this;
            self.set('deleteModalVisible', false);
            let outlayId = this.get('model').id;

            self.get('ajax').delete(`outlays/${outlayId}`, {
                crossDomain: true,
                xhrFields: { withCredentials: true },
                contentType: 'text/plain',
                dataType: "text"
            }).then(() => {
                self.set("successMsg", "Pago Eliminado");
                Ember.run.later(() => self.set("successMsg", ""), 3000);
                Ember.run.later(() => {
                    self.get('outlayLogController').send('search');
                    self.transitionToRoute('condo.outlay-log');
                }, 3000);
            }).catch(function(error) {
               self.handleError(error);
            });
        }
    }
});
