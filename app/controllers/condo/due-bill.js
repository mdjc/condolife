import Ember from 'ember';

export default Ember.Controller.extend({
    ajax: Ember.inject.service(),
    session: Ember.inject.service(),
    paymentMethods: [
        {label: 'Efectivo', value: "CASH"},
        {label: 'Cheque', value: "CHECK"},
        {label: 'Déposito', value: "DEPOSIT"},
        {label: 'Transferencia', value: "TRANSFER"}
    ],
    paymentMethod: 'CASH',
    pictValidExtensions: ['png', 'gif', 'jpg'],
    proofOfPaymentImgSrc: '',
    proofOfPaymentPict: '',
    errorMsg: '',
    successMsg: '',

    resetFields() {
        this.set('paymentMethod', 'CASH');
        this.set('proofOfPaymentImgSrc', '');
        this.set('proofOfPaymentPict', '');
        this.set('errorMsg', '');
        this.set('successMsg', '');
    },

    paymentInfoChanged() {
        return this.get('proofOfPaymentPict') 
            || this.get('paymentMethod') !== this.get('model.paymentMethod');       
    },

    actions: {
        selectPaymentMethod(method) {
            this.set('paymentMethod', method);
        },

        didSelectFiles(files) {
            let self = this;
            let file = files[0];
            self.set('proofOfPaymentPict', file);

            let reader = new FileReader();
            reader.onload = function(event) {
                let ext =  file.name.split('.').pop();

                if (self.get('pictValidExtensions').indexOf(ext) === -1) {
                    self.set("errorMsg", "Formato inválido, seleccione una imágen .PNG, .JPG, .GIF");
                    Ember.run.later(() => self.set("errorMsg", ""), 4000);
                    return;
                }

                if (file.size >= 1024 * 1024 * 1) {
                    self.set("errorMsg", "La imágen no debe exceder 1 Mega Byte");
                    Ember.run.later(() => self.set("errorMsg", ""), 4000);
                    return;
                }

                self.set('proofOfPaymentImgSrc', event.target.result);
            };

            reader.readAsDataURL(file);
        },

        sendPayment() {
            let self = this;

            if (self.get('model.paymentStatus') === 'REJECTED' 
                && !self.paymentInfoChanged()) {
                self.set("errorMsg", "Debe actualizar alguno de los campos para reenviar el pago");
                Ember.run.later(() => self.set("errorMsg", ""), 4000);
                return;
            }

            if (self.get('model.paymentStatus') === 'PENDING'
                && !self.get('proofOfPaymentPict')) {
                self.set("errorMsg", "Debe agregar un comprobante de pago");
                Ember.run.later(() => self.set("errorMsg", ""), 4000);
                return;
            }

            let billId = this.get('model').id;
            let formData = new FormData();
            formData.append('paymentMethod', this.get('paymentMethod'));    

            if (self.get('proofOfPaymentPict')) {
                formData.append('proofOfPaymentPict', this.get('proofOfPaymentPict'));
            }

            self.get('ajax').put(`bills/${billId}/payment`, {
                crossDomain: true,
                xhrFields: { withCredentials: true },
                processData: false,
                contentType: false,
                data: formData,
                dataType: "text"
            }).then(() => {
                self.set("successMsg", "Su pago ha sido enviado. Nuevo estado: En espera de confirmación");
                Ember.run.later(() => self.set("successMsg", ""), 5000);
                Ember.run.later(() => self.transitionToRoute('condo.due-bills'), 5000);
            }).catch(function() {
                self.set("errorMsg", "Error inesperado ");
                Ember.run.later(() => self.set("errorMsg", ""), 3000);
            });
        }
    }
});
