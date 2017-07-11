import Ember from 'ember';

export default Ember.Service.extend({
    currentUsername: null,
    currentUserRole: null,
    currentCondoId: null,

    init() {
        this._super(...arguments);
        this.set('currentUsername', this.loadFromStorage("currentUsername"));
        this.set('currentUserRole', this.loadFromStorage("currentUserRole"));
        this.set('currentCondoId', "");
    },

    login(username, role) {
        localStorage.setItem('currentUsername', username);
        localStorage.setItem('currentUserRole', role);
        this.set('currentUsername', username);
        this.set('currentUserRole', role);
    },

    logout() {
        localStorage.setItem('currentUsername', "");
        localStorage.setItem('currentUserRole', "");
        this.set('currentUsername', "");
        this.set('currentUserRole', "");
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
