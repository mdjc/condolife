import DS from 'ember-data';

export default DS.Model.extend({
    category: DS.attr(),
    comment: DS.attr('string'),
    createdOn: DS.attr(),
    amount: DS.attr('number')
});
