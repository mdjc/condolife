import Ember from 'ember';
import PaginatedSearch from 'condolife/classes/paginated-search';

export default Ember.Controller.extend({
    ajax: Ember.inject.service(),
    paginatedSearch: null,

    results: Ember.computed('paginatedSearch.results', function() {
        return this.paginatedSearch.results;
    }),

    moreResultsToLoad: Ember.computed('paginatedSearch.offset', function() {
       return this.paginatedSearch.offset < this.paginatedSearch.total;
    }),

    init() {
        this.paginatedSearch = PaginatedSearch.create({
            resultsObjectName: 'condo-bills', 
            ajax: this.get('ajax')
        });
    },

    load() {
        let self = this;
        let condoId = self.get('model').condoId;
        self.paginatedSearch.reset();
        self.paginatedSearch.loadMetaAndResults(`/condos/${condoId}/condoBills`, self.filters())
                .catch(error => self.handleError(error));
    },

    filters() {
        return {paymentStatus: ['PAID_AWAITING_CONFIRMATION']};
    },

    actions: {
        loadMoreResults() {
            let self = this;
            let condoId = self.get('model').condoId;

            self.paginatedSearch.loadResults(`/condos/${condoId}/condoBills`,  self.filters())
                .catch(error => self.handleError(error));
        }
    }
});
