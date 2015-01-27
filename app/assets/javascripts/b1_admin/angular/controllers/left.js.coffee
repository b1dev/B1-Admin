angular.module("B1Admin").controller "LeftPanelController", [
  "$scope"
  "$http"
  "$location"
  "$compile"
  ($scope, $http, $location,$compile) ->
    $scope.modules = {}
    $scope.toogle = (id) ->
      prev = $scope.modules[id]
      for k, v of $scope.modules
        $scope.modules[k] = false
      $scope.modules[id] = true  unless prev


    $scope.setRoute = (path) ->
      $location.path = path
      $http.get("#{path}?only_template").success (resp) ->
        $content = angular.element("#content-container")
        $content.html resp
        scope = $content.scope()
        $compile($content.contents()) scope
        angular.element(".selectpicker").selectpicker()
        
        
]