import DS from 'ember-data';

export default DS.Model.extend({
    amount: DS.attr('number'),
    apartment: DS.attr(),
    createdBy: DS.attr(),
    method: DS.attr(),
    status: DS.attr(),
    createdOn: DS.attr()
});
