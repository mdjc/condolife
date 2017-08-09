import Ember from 'ember';
import {isNotFoundError, isUnauthorizedError, isBadRequestError} from 'ember-ajax/errors';

export default Ember.Mixin.create({
    session: Ember.inject.service(),
    
    handleError(error) { 
        let transitionFunction = this.transitionToRoute || this.transitionTo;
            
        if (this.isUnauthorized(error)) {
            this.get('session').logout();
            transitionFunction.call(this, 'login');
        } else if (this.isNotfound(error)) {
            transitionFunction.call(this, 'notfound');               
        } else {
            transitionFunction.call(this, 'unexpected-error');
            Ember.Logger.error(error);
        }

    },

    isUnauthorized(error) {
        return (error.errors && error.errors[0].status === '401')
            || isUnauthorizedError(error);
    },

    isNotfound(error) {
        return (error.errors && error.errors[0].status === '404') 
            || isNotFoundError(error);
    },

    isBadRequest(error) {
        return (error.errors && error.errors[0].status === '400') 
            || isBadRequestError(error);
    }
});
