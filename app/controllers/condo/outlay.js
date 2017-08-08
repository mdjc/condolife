import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service(),
    ajaxHelper: Ember.inject.service(),
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
        delete() {
            let self = this;
            self.set('deleteModalVisible', false);
            let outlayId = this.get('model').id;

            self.get('ajaxHelper').delete(`outlays/${outlayId}`, 'text/plain', "text")
                .then(() => {
                    self.set("successMsg", "Gasto Eliminado");
                    Ember.run.later(() => self.set("successMsg", ""), 3000);
                    Ember.run.later(() => {
                        self.get('outlayLogController').send('search');
                        history.back();
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
