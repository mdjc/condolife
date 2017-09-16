import Ember from 'ember';

export default Ember.Controller.extend({
    ajaxHelper: Ember.inject.service(),
    session: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),

    navVisible: Ember.computed('routing.currentRouteName', function() {
        return this.get('routing.currentRouteName') != 'login'
    }),

    actions: {
        onLogout() {
            let self = this;
            self.get('ajaxHelper').post('logout', 'text/plain', "text")
                .then(() => {
                    self.get('session').logout(); 
                    self.transitionToRoute('index');
                });            
        }
    }
});
