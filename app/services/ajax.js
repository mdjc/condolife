import AjaxService from 'ember-ajax/services/ajax';
import Env from 'condolife/config/environment';

export default AjaxService.extend({
    host: Env.RestAPIHost
});