import Ember from 'ember';

export default Ember.Controller.extend({
    ajax: Ember.inject.service(),
    dateUtils: Ember.inject.service(),
    
    apartment: '',
    dueAmount: '',
    dueDate: '',
    description: '',
    errorMsg: '',
    successMsg: '',

    minDate: Ember.computed(function() {
        let today = new Date();
        return this.get('dateUtils').toStr(today);
    }),

    reset() {
        this.set('apartment', '');
        this.set('dueAmount', '');
        this.set('dueDate', '');
        this.set('description', '');
        this.set('errorMsg', '');
        this.set('successMsg', '');
    },

    actions: {
        send() {
            let self = this;

            if (!self.apartment || !self.dueAmount || !self.dueDate || !self.description) {
                self.set("errorMsg", "Por favor llena todos los campos");
                Ember.run.later(() => self.set("errorMsg", ""), 4000);
                return;
            }

            if (self.dueAmount < 0) {
                self.set("errorMsg", "El monto es inválido");
                Ember.run.later(() => self.set("errorMsg", ""), 4000);
                return;
            }

            let bill = {
                description: self.description,
                dueDate: self.dueDate,
                dueAmount: self.dueAmount,
                apartment: {name: self.apartment}
            };

            let condoId = this.get('model').condoId;

            self.get('ajax').post(`condos/${condoId}/condoBills`, {
                crossDomain: true,
                xhrFields: { withCredentials: true },
                data: bill,
                contentType: 'application/json',
                dataType: "text"
            }).then(function() {
                self.set("successMsg", "Factura creada");
                Ember.run.later(() => self.set("successMsg", ""), 2500);
                Ember.run.later(() => self.transitionToRoute('condo.dashboard'), 3000);
            }).catch((error) => {
                if (self.isBadRequest(error)) {
                    self.set("errorMsg", "Error - Por favor válida el apartamento y monto insertado");
                    Ember.run.later(() => self.set("errorMsg", ""), 6000);
                    return;
                }

                self.handleError(error);
            });
        }
    }
});
