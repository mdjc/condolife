import Ember from 'ember';

export default Ember.Route.extend({
    session: Ember.inject.service(),

    beforeModel(transition) {
        if (transition.targetName === 'index') {
            return;
        }

        if (!this.get('session').userAuthenticated()) {
           this.replaceWith('login');
        }
    },

    actions: {
        error(error) {
            if (error.errors[0].status === '401') {
                this.get('session').logout();
                this.replaceWith('login');
            }
        }
    }
});
