import Ember from 'ember';

export function pesos(params) { 
    let amount = params[0] ;
    return '$' + amount.toFixed(2).toString() + ' DOP';
}

export default Ember.Helper.helper(pesos);
