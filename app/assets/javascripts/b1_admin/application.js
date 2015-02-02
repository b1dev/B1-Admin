//= require jquery
//= require angular
//= require angular-animate
//= require angular-resource
//= require angular-route
//= require angular-ui-bootstrap
//= require angular-ui-bootstrap-tpls
//= require ./vendor/moment-with-locales
//= require ./vendor/pace.min
//= require ./vendor/angular-ui-tree
//= require ./vendor/bootstrap.min
//= require ./vendor/plug
//= require ./vendor/ng-table
//= require ./vendor/angular-bootstrap-switch
//= require ./vendor/compareTo
//= require ./vendor/angular-busy
//= require ./vendor/datetimepicker
//= require ./vendor/angular-autocomplete
//= require ./angular/app
//= require_tree ./angular/.
//= require_self



Array.prototype.unique = function() {
    var newArr = [],
        origLen = this.length,
        found, x, y;

    for (x = 0; x < origLen; x++) {
        found = undefined;
        for (y = 0; y < newArr.length; y++) {
            if (this[x] === newArr[y]) {
                found = true;
                break;
            }
        }
        if (!found) {
            newArr.push(this[x]);
        }
    }
    return newArr;
}