app = angular.module("B1Admin", ["ngRoute","ngResource","ui.tree",'ui.bootstrap','ngTable',"NgSwitchery"])

app.run [
    "$location"
    "$rootElement"
    "$rootScope"
    "$timeout"
    "$modal"
    "$http"
    "$compile"
    ($location, $rootElement,$rootScope,$timeout,$modal,$http,$compile) ->
      #$rootElement.off "click"
      $rootScope.server_error = "Server Error"
      loadPluguns = ->
        angular.element(".selectpicker").selectpicker()
        angular.forEach angular.element("[data-switchery]"), (elem) -> new Switchery(elem)
        
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

      $rootScope.updateSelect = (timeout) ->
        timeout = timeout or 100
        $timeout (->
          $('.selectpicker').selectpicker("refresh");
        ), timeout

      $rootScope.confirm = (data) ->
        $modal.open(
          templateUrl: "confirmModal.html"
          controller: "ConfirmController"
          resolve:
            params: -> data
        )
      $rootScope.showLoader = ->
        Pace.restart()

      $rootScope.setRoute = (path) ->
        $location.path = path
        $http.get("#{path}?only_template").success (resp) ->
          $content = angular.element("#content-container")
          $content.html resp
          scope = $content.scope()
          $compile($content.contents()) scope
          loadPluguns()


      loadPluguns()
  ]
  .config ['$logProvider', ($logProvider) ->
    $logProvider.debugEnabled true
  ]
  .config ['$locationProvider', ($locationProvider) ->
    $locationProvider.html5Mode
      enabled: true
      requireBase: false
  ]
app.factory "Config", ->
  perPage: 25

app.filter 'isempty', ->
  (input, replaceText) ->
    if input
      return input
    replaceText