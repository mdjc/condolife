import Ember from 'ember';

export default Ember.Route.extend({
    model() {
         return this.get('store').query('building', {});
    },

    afterModel(model) {
        if (model.get('length') === 1) {
          this.transitionTo('dashboard', model.get('firstObject.id'));
        }
    }
});
