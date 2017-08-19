import Ember from 'ember';

export default Ember.Controller.extend({
    ajaxHelper: Ember.inject.service(),
    session: Ember.inject.service(),
    
    username: "",
    password: "",
    errorMsg: "",
    loading: false,

    init() {
        this.set('username', '');
        this.set('password', '');
        this.set('errorMsg', '');
        this.set('loading', false);

        Ember.run.scheduleOnce('afterRender', this, function() {
            $('#username').focus();
        });  
    },

    actions: {
        login() {
            let self = this;
            self.set('loading', true);

            let headers =  { 
                    "Authorization": "Basic " + 
                    btoa(self.get('username') + ":" + self.get('password')) 
            };
            
            self.get('ajaxHelper').requestWithHeaders('post', 'login', headers)
                .then(response => {
                    self.get("session").login(response.name, response.role);
                    Ember.run.later(() => {
                        self.set('loading', false);
                        self.transitionToRoute('condos');
                    }, 500);
                }).catch(error => {
                    if (this.isUnauthorized(error)) {
                        self.set("errorMsg", "usario / contraseña inválido");
                        Ember.run.later(() => self.set("errorMsg", ""), 3000);
                        self.set('loading', false);
                        return;
                    }

                    this.handleError(error);
                });
        }
    }
});
