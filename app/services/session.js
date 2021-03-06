import Ember from 'ember';

export default Ember.Service.extend({
    currentUsername: null,
    currentUserRole: null,
    userHasSeveralCondos: false,

    init() {
        this._super(...arguments);
        this.set('currentUsername', this.loadFromStorage("currentUsername"));
        this.set('currentUserRole', this.loadFromStorage("currentUserRole"));
        this.set('userHasSeveralCondos', this.loadFromStorage("userHasSeveralCondos") === 'true');
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
        localStorage.setItem('userHasSeveralCondos', false);
        this.set('currentUsername', "");
        this.set('currentUserRole', "");
        this.set('userHasSeveralCondos', false);
    },

    userAuthenticated() {
        return this.get('currentUsername') !== "";
    },

    setUserHasSeveralCondos(value) {
        this.set('userHasSeveralCondos', value);
        localStorage.setItem('userHasSeveralCondos', value);
    },

    loadFromStorage(field) {
        let value = localStorage.getItem(field);

        if (value !== null) {
            return value;
        } 

        return "";
    }
});
