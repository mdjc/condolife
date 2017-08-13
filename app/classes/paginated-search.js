import Ember from 'ember';

const PaginatedSearch = Ember.Object.extend({
    resultsSearchLimit: 20,
    results: [],
    total: 0,
    offset: 0,
    loading: false,
 
    reset() {
        this.set('results', []);
        this.set('total', 0);
        this.set('offset', 0);
        this.set('hasMoreResults', false);
        this.set('loading', false);
    },

    loadMetaAndResults(url, filters) {
        let self = this;
        self.reset();
        self.set('loading', true);

        return self.get('ajaxHelper').requestJson(`${url}/meta`, filters)
                .then(response => {
                    self.set('total', response.total);
                    self.set('results', []);
                    self.loadResults(url, filters);
                });
    },

    loadResults(url, filters) {
        let self = this;
        self.set('loading', true);
        filters.limit = self.resultsSearchLimit;
        filters.offset = self.offset;

        return self.get('ajaxHelper').requestJson(url, filters)
                .then(response => {
                    response.forEach((item) => {
                        self.results.pushObject(item);
                    });
                   
                    self.set('offset', self.offset +  self.resultsSearchLimit);
                    Ember.run.later(() => self.set('loading', false), 500);
                });
    }
});

export default PaginatedSearch;