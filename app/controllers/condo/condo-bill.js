import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service(),
    ajax: Ember.inject.service(),
    billLogController: Ember.inject.controller('condo/bill-log'),
    
    deleteModalVisible: false,
    errorMsg: '',
    successMsg: '',
    
    isResident: Ember.computed('session.currentUserRole', function() {
        return this.get('session').currentUserRole === 'RESIDENT';
    }),

    actions: {
        deleteBill() {
            let self = this;
            self.set('deleteModalVisible', false);
            let billId = this.get('model').id;

            self.get('ajax').delete(`bills/${billId}`, {
                crossDomain: true,
                xhrFields: { withCredentials: true },
                contentType: 'text/plain',
                dataType: "text"
            }).then(() => {
                self.set("successMsg", "Factura Eliminada");
                Ember.run.later(() => self.set("successMsg", ""), 3000);
                Ember.run.later(() => {
                    self.get('billLogController').send('search');
                    self.transitionToRoute('condo.bill-log');
                }, 3000);
            }).catch(function() {
                self.set("errorMsg", "Error inesperado ");
                Ember.run.later(() => self.set("errorMsg", ""), 3000);
            });
        }
    }
});
