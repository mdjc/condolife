import DS from 'ember-data';

export default DS.Model.extend({
    category: DS.attr(),
    amount: DS.attr('number'),
    comment: DS.attr('string'),
    supplier: DS.attr('string'),
    createdOn: DS.attr()
});
