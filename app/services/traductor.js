import Ember from 'ember';

export default Ember.Service.extend({
    tokenMap: null,

    init() {
        this.set('tokenMap', new Map());
        let map =  this.get('tokenMap');

        map.set('CASH', 'Efectivo');
        map.set('CHECK', 'Cheque');
        map.set('DEPOSIT', 'Deposito');
        map.set('TRANSFER', 'Transferencia');

        map.set('PENDING', 'Pendiente');
        map.set('VALIDATED', 'Validado');
        map.set('REJECTED', 'Rechazado');

        map.set('SECURITY', 'Seguridad');
        map.set('MAINTAINANCE', 'Mantenimiento');
        map.set('CLEANING', 'Limpieza');
        map.set('REPARATION', 'Reparacion');
        map.set('OTHER', 'Otro');

        this.addTokensMonth(map);
    },

    translate(token) {
        let translated = this.get('tokenMap').get(token);

        if (!translated) {
            return `no default traduction for ${token}`;
        } 

        return translated;
    },

    addTokensMonth(map) {
        map.set('JANUARY', 'Enero');
        map.set('FEBRUARY', 'Fébrero');
        map.set('MARCH', 'Marzo');
        map.set('APRIL', 'Abril');
        map.set('MAY', 'Mayo');
        map.set('JUNE', 'Junio');
        map.set('JULY', 'Julio');
        map.set('AUGUST', 'Agosto');
        map.set('SEPTEMBER', 'Septiembre');
        map.set('OCTOBER', 'Octubre');
        map.set('NOVEMBER', 'Noviembre');
        map.set('DECEMBER', 'Diciembtre');
    }
});
