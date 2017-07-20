import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service(),
    ajax: Ember.inject.service(),
    dateUtils: Ember.inject.service(),
    from: '',
    to: '',
    pending: true,
    awaitingConfirmation: true,
    confirmed: true,
    rejected: true,
    resultsSearchLimit : 20,
    offset: 0,
    total: 0,
    results: [],
    errorMsg: '',
    lastCondoLoaded: '',

    reset() {
        let currentCondo = this.model.condoId;

        if (this.lastCondoLoaded !== currentCondo) {
            this.set('from', '');
            this.set('to', '');
            this.set('pending', true);
            this.set('awaitingConfirmation', true);
            this.set('confirmed', true);
            this.set('rejected', true);
            this.set('resultsSearchLimit', 20);
            this.set('offset', 0);
            this.set('total', 0);
            this.set('results', []);
            this.set('errorMsg', ''); 
        }
    },

    moreResultsToLoad: Ember.computed('offset', 'total', function() {
        return this.offset < this.total;
    }),

    addIfChecked(statusList, filter, filterVal) {
        if (filter) {
            statusList.push(filterVal);
        }
    },

    filters() {
        let filters = {};

        if (this.from) {
            filters.from = this.from;
        }

        if (this.to) {
            filters.to = this.to;
        }

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

    loadResults() {
        let self = this;
        let condoId = self.get('model').condoId;
        let filters = self.filters();

        filters.limit = self.resultsSearchLimit;
        filters.offset = self.offset;

        self.get('ajax').request(`/condos/${condoId}/condoBills`, {
            crossDomain: true,
            xhrFields: { withCredentials: true },
            traditional: true,
            data : filters
        }).then(response => {
            response['condo-bills'].forEach((item) => {
                self.results.pushObject(item);
            });
           
            self.set('offset', self.offset +  self.resultsSearchLimit);
        });

    },

    actions: {
        search() {
            let self = this;
            let condoId = self.get('model').condoId;
            self.set('offset', 0);

            if (!self.from || !self.to) {
                self.set("errorMsg", "Debe seleccionar un rango de fechas");
                Ember.run.later(() => self.set("errorMsg", ""), 4000);
                return;
            }

            self.get('ajax').request(`/condos/${condoId}/condoBills/meta`, {
                crossDomain: true,
                xhrFields: { withCredentials: true },
                traditional: true,
                data : self.filters()
            }).then(response => {
                self.set('total', response.meta.total);
                self.set('results', []);
                self.set('lastCondoLoaded', condoId);
                self.loadResults();
            });
        },

        loadMoreResults() {
            this.loadResults();
        }
    }
});
