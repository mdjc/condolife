import Ember from 'ember';
import Env from 'condolife/config/environment';

export default Ember.Controller.extend({
    imgHost: Ember.computed(function() {
        return `${Env.RestAPIHost}`;
    })
});
