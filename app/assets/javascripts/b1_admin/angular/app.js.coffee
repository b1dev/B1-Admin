app = angular.module("B1Admin", ["ngRoute","ngResource","ui.tree"])

app.run [
    "$location"
    "$rootElement"
    "$rootScope"
    ($location, $rootElement,$rootScope) ->

      $rootScope.server_error = "Server Error"

      errEl = $(".alert.alert-danger").clone()
      $rootScope.error = (selector,text) ->
      	errEl.find(".text").text(text)
      	errEl.addClass("in").show()
      	$(selector).prepend(errEl)

      sucEl = $(".alert.alert-success").clone()
      $rootScope.info = (selector,text) ->
        sucEl.find(".text").text(text)
        sucEl.addClass("in").show()
        $(selector).prepend(sucEl)

      $rootScope.showLoader = ->
        Pace.restart()
  ]
  .config ['$logProvider', ($logProvider) ->
    $logProvider.debugEnabled true
  ]
  .config ['$locationProvider', ($locationProvider) ->
    $locationProvider.html5Mode
      enabled: true
      requireBase: false
  ]
