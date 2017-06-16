import Ember from 'ember';

export default Ember.Controller.extend({
    ajax: Ember.inject.service(),
    session: Ember.inject.service(),
    actions: {
        onLogout() {
            let self = this;
            self.get('ajax').post('/logout', { 
                crossDomain: true,
                contentType: 'text/plain',
                dataType: "text"
            }).then(() => {
                 this.get('session').logout(); 
                 this.transitionToRoute('index');
            });            
        }
    }
});
