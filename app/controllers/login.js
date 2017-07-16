import Ember from 'ember';
import {isUnauthorizedError} from 'ember-ajax/errors';

export default Ember.Controller.extend({
    ajax: Ember.inject.service(),
    session: Ember.inject.service(),
    
    username: "",
    password: "",
    errorMsg: "",

    init() {
        this.set('username', '');
        this.set('password', '');
        this.set('errorMsg', '');

        Ember.run.scheduleOnce('afterRender', this, function() {
            $('#username').focus();
        });  
    },

    actions: {
        login() {
            let self = this;
            self.get('ajax').post('/login', {
                crossDomain: true,
                xhrFields: { withCredentials: true },
                headers: { 
                    "Authorization": "Basic " + 
                    btoa(self.get('username') + ":" + self.get('password')) 
                }
            }).then(response => {
               self.get("session").login(response.name, response.role);
               self.transitionToRoute('condos');
            }).catch(error => {
                if (isUnauthorizedError(error)) {
                    self.set("errorMsg", "invalid username/password");
                } else {
                    self.set("errorMsg", "unexpected error");
                }

                Ember.run.later(() => self.set("errorMsg", ""), 3000);
            });
        }
    }
});
