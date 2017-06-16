import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service(),
    username: Ember.computed('session.currentUsername', function() {
       return this.get('session').currentUsername;
    })
});
