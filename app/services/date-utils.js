import Ember from 'ember';

export default Ember.Service.extend({
    toStr(date) {
      return date.getFullYear() + '-' + this.padWithZero((date.getMonth()+ 1)) + '-' 
        + this.padWithZero(date.getDate());   
    },

    beginningOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    },

    endOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    },

    padWithZero(n) {
        var str = n.toString();

        if (str.length === 1) {
            return "0" + str;
        }
        
        return str;
    }
});
