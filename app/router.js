import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('condos');
  
  this.route('condo', {path: 'condos/:condoId'}, function() {
    this.route('dashboard');
    this.route('due-bills');
    this.route('due-bill', {path: 'due-bills/:bill_id'});
    this.route('unconfirmed-bills');
    this.route('unconfirmed-bill', {path: 'unconfirmed-bills/:condo-bill_id'});
    this.route('bill-log');
    this.route('condo-bill', {path: 'bill-log/:condo-bill_id'});
    this.route('new-bill');
    this.route('outlay-log');
    this.route('outlay', {path: 'outlay-log/:outlay_id'});
    this.route('new-outlay');
  });

  this.route("notfound");
  this.route('unexpected-error');
  this.route("page-notfound", { path: "*path"});
  
});

export default Router;
