import Ember from 'ember';

export default Ember.Helper.extend({
  traductor: Ember.inject.service(),
  compute(params) {
    let token = params[0];
    return this.get('traductor').translate(token);
  }
});