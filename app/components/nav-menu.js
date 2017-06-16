import Ember from 'ember';

export default Ember.Component.extend({
    session: Ember.inject.service(),
    authenticated: Ember.computed('session.currentUsername', function() {
       return this.get('session').userAuthenticated();
    }),

    actions: {
       logout() {
           this.get('onLogout')();
       }
    }
});
