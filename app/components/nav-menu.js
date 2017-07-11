import Ember from 'ember';

export default Ember.Component.extend({
    dropDownOpen: false,
    session: Ember.inject.service(),

    username: Ember.computed('session.currentUsername', function () {
      return this.get('session').currentUsername; 
    }),
    
    authenticated: Ember.computed('session.currentUsername', function() {
      return this.get('session').userAuthenticated();
    }),

    actions: {
       logout() {
           this.get('onLogout')();
       },

       toggleNavBar() {
           if (this.get('collapse') === "") {
              this.set('collapse', "collapse");
           } else {
              this.set('collapse', "");
           }
       },

       toggleDropDown() {
          this.toggleProperty('dropDownOpen');
       }
    }
});
