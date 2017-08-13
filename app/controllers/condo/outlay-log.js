import Ember from 'ember';
import PaginatedSearch from 'condolife/classes/paginated-search';

export default Ember.Controller.extend({
    ajaxHelper: Ember.inject.service(),
    from: '',
    to: '',
    errorMsg: '',
    lastCondoLoaded: '',
    paginatedSearch: null,

    init() {
        this.paginatedSearch = PaginatedSearch.create({
            ajaxHelper: this.get('ajaxHelper')
        });
    },

    results: Ember.computed('paginatedSearch.results', function() {
        return this.paginatedSearch.results;
    }),

    moreResultsToLoad: Ember.computed('paginatedSearch.offset', function() {
       return this.paginatedSearch.offset < this.paginatedSearch.total;
    }),

    loading: Ember.computed('paginatedSearch.loading', function() {
       return this.paginatedSearch.loading === true;
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

            self.paginatedSearch.loadMetaAndResults(`condos/${condoId}/outlays`, self.filters())
                .catch(error => self.handleError(error));
        },

        loadMoreResults() {
            let self = this;
            let condoId = self.get('model').condoId;

            self.paginatedSearch.loadResults(`condos/${condoId}/outlays`,  self.filters())
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
