import Ember from 'ember';
import linkBackHelper from 'ember-helpers-link-back/helper';

export default {
  name: '{{link-back}} helper',
  initialize: function() {
    Ember.Handlebars.registerHelper('link-back', linkBackHelper);
  }
}
