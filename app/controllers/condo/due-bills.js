import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service(),
    
    currentCondoId: Ember.computed('session.currentCondoId', function() {
        return this.get('session').currentCondoId;
    }),

    totalDue: Ember.computed('model.@each.dueAmount', function() {
        return this.get('model').mapBy('dueAmount').reduce((a, b) => a + b, 0);
    })
});
