import Ember from 'ember';

export default Ember.Controller.extend({
    offCanvasMenuOpen: false,
    actions: {
        toggleMenu() {
            this.toggleProperty('offCanvasMenuOpen');
        }
    }
});
