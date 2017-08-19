import Ember from 'ember';

export default Ember.Controller.extend({
    ajaxHelper: Ember.inject.service(),
    outlayLogController: Ember.inject.controller('condo/outlay-log'),

    categories: [
        {label: 'Mantenimiento', value: "MAINTAINANCE"},
        {label: 'Seguridad', value: "SECURITY"},
        {label: 'Limpieza', value: "CLEANING"},
        {label: 'Reparación', value: "REPARATION"},
        {label: 'Otro', value: "OTHER"}
    ],
    pictValidExtensions: ['png', 'gif', 'jpg'],
    category: 'MAINTAINANCE',
    amount: '',
    supplier: '',
    comment: '',
    receiptImg: '',
    receiptImgSrc: '',
    loadingSend: false,

    reset() {
        this.set('category', 'MAINTAINANCE');
        this.set('amount', '');
        this.set('supplier', '');
        this.set('comment', '');
        this.set('receiptImg', '');
        this.set('receiptImgSrc', '');
        this.set('errorMsg', '');
        this.set('successMsg', '');
        this.set('loadingSend', false);
    },

    actions : {
        selectCategory(category) {
            this.set('category', category);
        },

        didSelectFile(files) {
            if (!files[0]) {
                return;
            }

            let self = this;
            let file = files[0];
            self.set('receiptImg', file);

            let reader = new FileReader();
            reader.onload = function(event) {
                let ext =  file.name.toLowerCase().split('.').pop();

                if (self.get('pictValidExtensions').indexOf(ext) === -1) {
                    self.set("errorMsg", "Formato inválido, seleccione una imágen .PNG, .JPG, .GIF");
                    Ember.run.later(() => self.set("errorMsg", ""), 4000);
                    return;
                }

                if (file.size >= 1024 * 1024 * 3) {
                    self.set("errorMsg", "La imágen no debe exceder 3 Mega Bytes");
                    Ember.run.later(() => self.set("errorMsg", ""), 4000);
                    return;
                }

                self.set('receiptImgSrc', event.target.result);
            };

            reader.readAsDataURL(file);
        },

        sendOutlay() {
            let self = this;

            if (!self.get('amount')) {
                self.set("errorMsg", "El monto es requerido");
                Ember.run.later(() => self.set("errorMsg", ""), 4000);
                return;
            }

            if (!self.get('receiptImg')) {
                self.set("errorMsg", "Debe agregar un recibo");
                Ember.run.later(() => self.set("errorMsg", ""), 4000);
                return;
            }

            this.set('loadingSend', true);
            let condoId = self.get('model').condoId;
            let formData = new FormData();
            formData.append('category', this.get('category')); 
            formData.append('amount', this.get('amount')); 
            formData.append('supplier', this.get('supplier')); 
            formData.append('comment', this.get('comment')); 
            formData.append('receiptImg', this.get('receiptImg'));   

            self.get('ajaxHelper').post(`condos/${condoId}/outlays`, false, "text", formData, false)
                .then(() => {
                    Ember.run.later(() => {
                        this.set('loadingSend', false);
                        self.set("successMsg", "Gasto agregado.");
                    }, 500);
                    Ember.run.later(() => self.transitionToRoute('condo.dashboard'), 2500);
                    Ember.run.later(() => self.set("successMsg", ""), 3000);
                    self.get('outlayLogController').send('reset');
                }).catch(error => {
                   this.set('loadingSend', false);
                   self.handleError(error);
                });
        }
    }
});
