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
    this.route('condo-bill', {path: 'condo-bill/:condo-bill_id'});
  });



  this.route("notfound");
  this.route('unexpected-error');
  this.route("page-notfound", { path: "*path"});
  
});

export default Router;
