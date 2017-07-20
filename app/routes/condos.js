import Ember from 'ember';

export default Ember.Route.extend({
    session: Ember.inject.service(),

    model() {
         return this.get('store').query('condo', {});
    },

    afterModel(model) {
        if (model.get('length') === 1) {
          this.transitionTo('condo', model.get('firstObject.id'));
        } else {
            this.get('session').setUserHasSeveralCondos(true);
        }
    }
});
