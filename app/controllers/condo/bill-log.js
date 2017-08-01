import Ember from 'ember';
import PaginatedSearch from 'condolife/classes/paginated-search';

export default Ember.Controller.extend({
    ajax: Ember.inject.service(),
    from: '',
    to: '',
    pending: true,
    awaitingConfirmation: true,
    confirmed: true,
    rejected: true,
    errorMsg: '',
    lastCondoLoaded: '',
    paginatedSearch: null,

    init() {
        this.paginatedSearch = PaginatedSearch.create({
            resultsObjectName: 'condo-bills', 
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
            this.set('from', '');
            this.set('to', '');
            this.set('pending', true);
            this.set('awaitingConfirmation', true);
            this.set('confirmed', true);
            this.set('rejected', true);
            this.set('errorMsg', ''); 
            this.paginatedSearch.reset();
        }
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

            self.paginatedSearch.loadMetaAndResults(`/condos/${condoId}/condoBills`, self.filters())
                .catch(error => self.handleError(error));
        },

        loadMoreResults() {
            let self = this;
            let condoId = self.get('model').condoId;

            self.paginatedSearch.loadResults(`/condos/${condoId}/condoBills`,  self.filters())
                .catch(error => self.handleError(error));
        }
    },

    filters() {
        let filters = {
            'from': this.from,
            'to': this.to
        };      
        
        let statusList = [];
        this.addIfChecked(statusList, this.pending, 'PENDING');
        this.addIfChecked(statusList, this.awaitingConfirmation,  'PAID_AWAITING_CONFIRMATION');
        this.addIfChecked(statusList, this.confirmed, 'PAID_CONFIRMED');
        this.addIfChecked(statusList, this.rejected, 'REJECTED');

        if (statusList.length) {
            filters.paymentStatus = statusList;
        }

        return filters;
    },

    addIfChecked(statusList, filter, filterVal) {
        if (filter) {
            statusList.push(filterVal);
        }
    }
});
