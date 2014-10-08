import Ember from 'ember';

var get = Ember.get;
var fmt = Ember.String.fmt;
var keys = Ember.keys;
var typeOf = Ember.typeOf;

export default Ember.LinkView.extend({
  /**
   Computed property that returns the current route name,
   dynamic segments, and query params. Returns falsy if
   for null/undefined params to indicate that the link view
   is still in a loading state.

   @private
   @property
   @return {Array} An array with the route name and any dynamic segments
   **/
  loadedParams: Ember.computed('resolvedParams', function computeLinkBackViewRouteArgs() {
    var router = get(this, 'router');
    if (!router) { return; }

    var resolvedParams = get(this, 'resolvedParams'),
      namedRoute = resolvedParams.targetRouteName;

    if (!namedRoute) { return; }

    Ember.assert(fmt("The attempt to link-to route '%@' failed. " +
        "The router did not find '%@' in its possible routes: '%@'",
        [namedRoute, namedRoute, keys(router.router.recognizer.names).join("', '")]),
      router.hasRoute(namedRoute));

    if (!paramsAreLoaded(resolvedParams.models)) { return; }

    var contexts = resolvedParams.models;

    var isActive = router.isActive.apply(router, routeArgs(resolvedParams.targetRouteName, resolvedParams.models, contexts, null));
    if (isActive) {
      resolvedParams.targetRouteName = this.get('back');
    }

    return resolvedParams;
  })
});

function paramsAreLoaded(params) {
  for (var i = 0, len = params.length; i < len; ++i) {
    var param = params[i];
    if (param === null || typeof param === 'undefined') {
      return false;
    }
  }
  return true;
}

export function routeArgs(targetRouteName, models, queryParams) {
  var args = [];
  if (typeOf(targetRouteName) === 'string') {
    args.push('' + targetRouteName);
  }
  args.push.apply(args, models);
  args.push({ queryParams: queryParams });
  return args;
}
