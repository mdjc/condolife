import Ember from 'ember';

export default Ember.Component.extend({
    imgBig: false,

    actions: {
        toggleResize() {
          this.toggleProperty('imgBig');
        }
    }
});
