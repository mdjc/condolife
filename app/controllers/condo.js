import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service(),
    offCanvasMenuOpen: false,

    isResident: Ember.computed('session.currentUserRole', function() {
        return this.get('session').currentUserRole === 'RESIDENT';
    }),

    userHasSeveralCondos: Ember.computed('session.userHasSeveralCondos', function() {
        return this.get('session').userHasSeveralCondos;
    }),

    actions: {
        toggleMenu() {
            this.toggleProperty('offCanvasMenuOpen');
        }
    }
});
