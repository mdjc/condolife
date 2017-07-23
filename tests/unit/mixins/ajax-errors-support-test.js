import Ember from 'ember';
import AjaxErrorsSupportMixin from 'condolife/mixins/ajax-errors-support';
import { module, test } from 'qunit';

module('Unit | Mixin | ajax errors support');

// Replace this with your real tests.
test('it works', function(assert) {
  let AjaxErrorsSupportObject = Ember.Object.extend(AjaxErrorsSupportMixin);
  let subject = AjaxErrorsSupportObject.create();
  assert.ok(subject);
});
