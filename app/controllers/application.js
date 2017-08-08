import Ember from 'ember';

export default Ember.Controller.extend({
    ajaxHelper: Ember.inject.service(),
    session: Ember.inject.service(),
    
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
