import DS from 'ember-data';

export default DS.Model.extend({
    description: DS.attr('string'),
    dueDate: DS.attr(),
    dueAmount: DS.attr('number'),
    paymentStatus: DS.attr('string'),
    paymentMethod: DS.attr('string')
});
