import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('mybuildings');
  this.route('dashboard', {path: 'mybuildings/:buildingId/dashboard'});
 
  this.route("notfound");
  this.route('unexpected-error');
  this.route("page-notfound", { path: "*path"});
});

export default Router;
