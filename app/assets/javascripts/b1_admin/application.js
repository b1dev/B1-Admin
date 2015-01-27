//= require jquery


//= require ./vendor/pace.min


//= require angular
//= require angular-animate
//= require angular-resource
//= require angular-route
//= require ./vendor/angular-ui-tree
//= require ./vendor/bootstrap.min
//= require ./vendor/plugins.min
//= require ./angular/app
//= require_tree ./angular/.
//= require_self

function clone(o) {
 if(!o || 'object' !== typeof o)  {
   return o;
 }
 var c = 'function' === typeof o.pop ? [] : {};
 var p, v;
 for(p in o) {
 if(o.hasOwnProperty(p)) {
  v = o[p];
  if(v && 'object' === typeof v) {
    c[p] = clone(v);
  }
  else {
    c[p] = v;
  }
 }
}
 return c;
}