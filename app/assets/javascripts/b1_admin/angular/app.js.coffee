app = angular.module("B1Admin", [])

app.run [
    "$location"
    "$rootElement"
    ($location, $rootElement) ->
      $rootElement.off "click"
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
