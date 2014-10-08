import Ember from 'ember';
import LinkBackView from 'ember-helpers-link-back/view';

var QueryParams = Ember.Object.extend({
  values: null
});

var slice = [].slice;

export default function linkBackHelper() {
  var options = slice.call(arguments, -1)[0],
    params = slice.call(arguments, 0, -1),
    hash = options.hash;

  Ember.assert("You must provide one or more parameters to the link-back helper.", params.length);

  if (params[params.length - 1] instanceof QueryParams) {
    hash.queryParamsObject = params.pop();
  }

  hash.disabledBinding = hash.disabledWhen;

  if (!options.fn) {
    var linkTitle = params.shift();
    var linkType = options.types.shift();
    var context = this;
    if (linkType === 'ID') {
      options.linkTextPath = linkTitle;
      options.fn = function() {
        return Ember.Handlebars.getEscaped(context, linkTitle, options);
      };
    } else {
      options.fn = function() {
        return linkTitle;
      };
    }
  }

  hash.parameters = {
    context: this,
    options: options,
    params: params
  };

  options.helperName = options.helperName || 'link-back';

  return Ember.Handlebars.helpers.view.call(this, LinkBackView, options);
}
