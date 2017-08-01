import Ember from 'ember';

const PaginatedSearch = Ember.Object.extend({
    resultsSearchLimit: 20,
    resultsObjectName: '',
    results: [],
    total: 0,
    offset: 0,
 
    reset() {
        this.set('results', []);
        this.set('total', 0);
        this.set('offset', 0);
        this.set('hasMoreResults', false);
    },

    loadMetaAndResults(url, filters) {
        let self = this;
        self.reset();

        return self.get('ajax').request(`${url}/meta`, {
                    crossDomain: true,
                    xhrFields: { withCredentials: true },
                    traditional: true,
                    data : filters
                }).then(response => {
                    self.set('total', response.meta.total);
                    self.set('results', []);
                    self.loadResults(url, filters);
                });
    },

    loadResults(url, filters) {
        let self = this;
        filters.limit = self.resultsSearchLimit;
        filters.offset = self.offset;

        return self.get('ajax').request(url, {
                crossDomain: true,
                xhrFields: { withCredentials: true },
                traditional: true,
                data : filters
            }).then(response => {
                response[self.get('resultsObjectName')].forEach((item) => {
                    self.results.pushObject(item);
                });
               
                self.set('offset', self.offset +  self.resultsSearchLimit);
            });
    }
});

export default PaginatedSearch;