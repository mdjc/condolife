import Ember from 'ember';

export default Ember.Service.extend({
    ajax: Ember.inject.service(),

    request(url, contentType, dataType, data) {
        return this._requestWithCred('GET', url, contentType, dataType, data);
    },

    requestJson(url, data) {
        return this._requestWithCred('GET', url, null, null, data);
    },

    requestWithHeaders(method, url, headers) {
        return this.get('ajax').request(url, {
            'method': method,
            'crossDomain': true,
            'xhrFields': { withCredentials: true },
            headers: headers
        });
    },

    post(url, contentType, dataType, data, processData) {
        return this._requestWithCred('POST', url, contentType, dataType, data, processData);
    },

    put(url, contentType, dataType, data, processData) {
        return this._requestWithCred('PUT', url, contentType, dataType, data, processData);
    },

    patch(url, contentType, dataType, data) {
        return this._requestWithCred('PATCH', url, contentType, dataType, data);
    },

    delete(url, contentType, dataType, data) {
        return this._requestWithCred('DELETE', url, contentType, dataType, data);
    },

    _requestWithCred(method, url, contentType, dataType, data, processData = true) {
        let options = {
            method: method,
            'crossDomain': true,
            'xhrFields': { withCredentials: true },
            traditional: true,
            processData: processData
        };

        if (contentType !== null) {
            options.contentType = contentType;
        }

        if (dataType !== null) {
            options.dataType = dataType;
        }

        if (data !== null) {
            options.data = data;
        }

        return this.get('ajax').request(url, options);
    }
});
