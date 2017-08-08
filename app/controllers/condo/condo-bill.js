import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service(),
    ajaxHelper: Ember.inject.service(),
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

            self.get('ajaxHelper').delete(`bills/${billId}`,'text/plain',"text")
                .then(() => {
                    self.set("successMsg", "Factura Eliminada");
                    Ember.run.later(() => self.set("successMsg", ""), 3000);
                    Ember.run.later(() => {
                        self.get('billLogController').send('search');
                        self.transitionToRoute('condo.bill-log');
                }, 3000);
            }).catch(function(error) {
               self.handleError(error);
            });
        }
    }
});
