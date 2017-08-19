import Ember from 'ember';
import {isNotFoundError, 
    isUnauthorizedError, 
    isBadRequestError, 
    isForbiddenError} from 'ember-ajax/errors';

export default Ember.Mixin.create({
    session: Ember.inject.service(),
    
    handleError(error) { 
        let transitionFunction = this.transitionToRoute || this.transitionTo;
            
        if (isUnauthorizedError(error)) {
            this.get('session').logout();
            transitionFunction.call(this, 'login');
        } else if (isNotFoundError(error)) {
            transitionFunction.call(this, 'notfound');
        } else if (isForbiddenError(error)) {
            transitionFunction.call(this, 'forbidden');               
        } else {
            transitionFunction.call(this, 'unexpected-error');
            Ember.Logger.error(error);
        }
    },
    
    isUnauthorized(error) {
        return isUnauthorizedError(error);
    },

    isBadRequest(error) {
        return isBadRequestError(error);
    }
});
