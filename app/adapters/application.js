import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTAdapter .extend({
    session: Ember.inject.service(),
    host: 'http://localhost:8080',
    namespace: Ember.computed('session.currentBuildingId', function() {
        return "buildings/" + this.get('session').currentBuildingId;
    }),

    ajax: function(url, method, hash) {
        hash = hash || {};
        hash.crossDomain = true;
        hash.xhrFields = {withCredentials: true};
        return this._super(url, method, hash);
    }
});
