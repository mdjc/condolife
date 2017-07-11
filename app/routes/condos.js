import Ember from 'ember';

export default Ember.Route.extend({
    model() {
         return this.get('store').query('condo', {});
    },

    afterModel(model) {
        if (model.get('length') === 1) {
          this.transitionTo('condo', model.get('firstObject.id'));
        }
    }
});
