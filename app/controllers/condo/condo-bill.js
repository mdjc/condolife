import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service(),
    ajaxHelper: Ember.inject.service(),
    billLogController: Ember.inject.controller('condo/bill-log'),
    
    deleteModalVisible: false,
    errorMsg: '',
    successMsg: '',
    loadingDelete: false,
    
    isResident: Ember.computed('session.currentUserRole', function() {
        return this.get('session').currentUserRole === 'RESIDENT';
    }),

    actions: {
        deleteBill() {
            let self = this;
            self.set('deleteModalVisible', false);
            let billId = this.get('model').id;
            self.set('loadingDelete', true);

            self.get('ajaxHelper').delete(`condoBills/${billId}`,'text/plain',"text")
                .then(() => {
                    Ember.run.later(() => {
                        self.set('loadingDelete', false);
                        self.set("successMsg", "Factura Eliminada");    
                    } , 500);
                    Ember.run.later(() => {
                        self.set("successMsg", "");
                        self.get('billLogController').send('search');
                        self.transitionToRoute('condo.bill-log');
                    }, 3000);
            }).catch(function(error) {
               self.handleError(error);
            });
        },

        back() {
            history.back();
        }
    }
});
