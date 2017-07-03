import Ember from 'ember';

export default Ember.Service.extend({
    currentUsername: null,
    currentCondoId: null,

    init() {
        this._super(...arguments);
        this.set('currentUsername', this.loadFromStorage("currentUsername"));
        this.set('currentCondoId', "");
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
        return this.get('currentUsername') !== "";
    },

    setCurrentCondo(id) {
        this.set('currentCondoId', id);
    },

    getCurrentCondo() {
        this.get('currentCondoId');
    },

   loadFromStorage(field) {
        let value = localStorage.getItem(field);

        if (value !== "") {
            return value;
        } 

        return "";
    }
});
