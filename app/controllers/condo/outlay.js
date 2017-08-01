import Ember from 'ember';

export default Ember.Controller.extend({
    receiptImg: Ember.computed('model', function() {
        let outlay = this.get('model');
        return `http://localhost:8080/outlays/${outlay.id}/receipt-img`;
    })
});
