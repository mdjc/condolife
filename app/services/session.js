import Ember from 'ember';

export default Ember.Service.extend({
    currentUsername: null,

    init() {
        this._super(...arguments);
        this.set('currentUsername', "");
    },

    login(username) {
        localStorage.setItem('currentUsername', username);
        this.set('currentUsername', username);
    },

    logout() {
        localStorage.setItem('currentUsername', "");
        this.set('currentUsername', "");
    },

    userAuthenticated() {
        if (this.get('currentUsername') === "") 
            this.set('currentUsername', localStorage.currentUsername);            

        return this.get('currentUsername') !== "";
    }
});
