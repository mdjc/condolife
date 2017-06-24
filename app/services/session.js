import Ember from 'ember';

export default Ember.Service.extend({
    currentUsername: null,
    currentBuildingId: null,

    init() {
        this._super(...arguments);
        this.set('currentUsername', this.loadFromStorage("currentUsername"));
        this.set('currentBuildingId', "");
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

    setCurrentBuilding(id) {
        this.set('currentBuildingId', id);
    },

    getCurrentBuilding() {
        this.get('currentBuildingId');
    },

   loadFromStorage(field) {
        let value = localStorage.getItem(field);

        if (value !== "") {
            return value;
        } 

        return "";
    }
});
