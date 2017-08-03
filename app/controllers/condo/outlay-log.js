import Ember from 'ember';
import PaginatedSearch from 'condolife/classes/paginated-search';

export default Ember.Controller.extend({
    ajax: Ember.inject.service(),
    from: '',
    to: '',
    errorMsg: '',
    lastCondoLoaded: '',
    paginatedSearch: null,

    init() {
        this.paginatedSearch = PaginatedSearch.create({
            resultsObjectName: 'outlays', 
            ajax: this.get('ajax')
        });
    },

    results: Ember.computed('paginatedSearch.results', function() {
        return this.paginatedSearch.results;
    }),

    moreResultsToLoad: Ember.computed('paginatedSearch.offset', function() {
       return this.paginatedSearch.offset < this.paginatedSearch.total;
    }),

    reset() {
        let currentCondo = this.model.condoId;

        if (this.lastCondoLoaded !== currentCondo) {
            this.resetFields();
        }
    },

    resetFields() {
        this.set('from', '');
        this.set('to', '');
        this.set('errorMsg', ''); 
        this.paginatedSearch.reset();
    },


    actions: {
        search() {
            let self = this;
            let condoId = self.get('model').condoId;
            self.set('lastCondoLoaded', condoId);

            if (!self.from || !self.to) {
                self.set("errorMsg", "Debe seleccionar un rango de fechas");
                Ember.run.later(() => self.set("errorMsg", ""), 4000);
                return;
            }

            self.paginatedSearch.loadMetaAndResults(`/condos/${condoId}/outlays`, self.filters())
                .catch(error => self.handleError(error));
        },

        loadMoreResults() {
            let self = this;
            let condoId = self.get('model').condoId;

            self.paginatedSearch.loadResults(`/condos/${condoId}/outlays`,  self.filters())
                .catch(error => self.handleError(error));
        },

        reset() {
            this.resetFields();
        }
    },

    filters() {
        return {
            'from': this.from,
            'to': this.to
        };
    }
});
