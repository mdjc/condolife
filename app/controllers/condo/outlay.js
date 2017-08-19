import Ember from 'ember';
import Env from 'condolife/config/environment';

export default Ember.Controller.extend({
    session: Ember.inject.service(),
    ajaxHelper: Ember.inject.service(),
    outlayLogController: Ember.inject.controller('condo/outlay-log'),
    deleteModalVisible: false,
    loadingDelete: false,

    isResident: Ember.computed('session.currentUserRole', function() {
        return this.get('session').currentUserRole === 'RESIDENT';
    }),

    receiptImg: Ember.computed('model', function() {
        let outlay = this.get('model');
        return `${Env.RestAPIHost}/outlays/${outlay.id}/receipt-img`;
    }),

    actions: {
        delete() {
            let self = this;
            self.set('deleteModalVisible', false);
            self.set('loadingDelete', true);
            let outlayId = this.get('model').id;

            self.get('ajaxHelper').delete(`outlays/${outlayId}`, 'text/plain', "text")
                .then(() => {
                    Ember.run.later(() => {
                        self.set('loadingDelete', false);
                        self.set("successMsg", "Gasto Eliminado");
                    }, 500);
                    Ember.run.later(() => {
                        self.get('outlayLogController').send('search');
                        history.back();
                    }, 2500);
                    Ember.run.later(() => self.set("successMsg", ""), 3000);
                }).catch(function(error) {
                   self.handleError(error);
                });
        },

        back() {
            history.back();
        }
    }
});
