import Ember from 'ember';
import {isNotFoundError, isUnauthorizedError} from 'ember-ajax/errors';
import AjaxServiceSupport from 'ember-ajax/mixins/ajax-support';

export default Ember.Route.extend(AjaxServiceSupport, { 
    session: Ember.inject.service(),

    beforeModel(transition) {
        if (transition.targetName === 'index') {
            return;
        }

        if (!this.get('session').userAuthenticated()) {
           this.replaceWith('login');
        }
    },

    actions: {
        error(error) {
            const request = this.emberDataOrAjaxRequest;
            
            if (request.unauthorized(error)) {
                this.get('session').logout();
                this.replaceWith('login');
            } else if (request.notfound(error)) {
                this.replaceWith('notfound');               
            } else {
                this.replaceWith('unexpected-error');               
            }
        }
    },

    emberDataOrAjaxRequest: {
        unauthorized(error) {
            return (error.errors && error.errors[0].status === '401')
                || isUnauthorizedError(error);
        },

        notfound(error) {
            return (error.errors && error.errors[0].status === '404') 
                || isNotFoundError(error);
        }
    }
});
