import Ember from 'ember';

export default Ember.Controller.extend({
    totalDue: Ember.computed('model.@each.dueAmount', function() {
        return this.get('model').mapBy('dueAmount').reduce((a, b) => a + b, 0);
    })
});
