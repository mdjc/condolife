import Ember from 'ember';

export default Ember.Helper.extend({
  traductor: Ember.inject.service(),
  compute(params) {
    let transService = this.get('trans');
    let token = params[0];
    return this.get('traductor').translate(token);
  }
});