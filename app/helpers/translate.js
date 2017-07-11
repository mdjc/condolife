import Ember from 'ember';

export default Ember.Helper.extend({
  traductor: Ember.inject.service(),
  
  compute(params) {
    return this.get('traductor').translate(params[0]);
  }
});