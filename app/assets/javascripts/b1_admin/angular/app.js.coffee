app = angular.module("B1Admin", [])

app.run [
    "$location"
    "$rootElement"
    "$rootScope"
    ($location, $rootElement,$rootScope) ->
      $rootElement.off "click"
      el = $(".alert.alert-danger").clone()
      $rootScope.server_error = "Server Error"
      $rootScope.error = (selector,text) ->
      	el.find(".text").text(text)
      	el.addClass("in").show()
      	$(selector).prepend(el)
  ]
  .config ['$httpProvider', ($httpProvider) ->
    authToken = $('[name="authenticity_token"]').val()
    $httpProvider.defaults.headers.common["X-CSRF-TOKEN"] = authToken
  ]
  .config ['$logProvider', ($logProvider) ->
    $logProvider.debugEnabled true
  ]
  .config ['$locationProvider', ($locationProvider) ->
    $locationProvider.html5Mode true
  ]
