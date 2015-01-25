angular.module("B1Admin").controller "LeftPanelController", [
  "$scope"
  "$element"
  "$rootScope"
  ($scope, $element, $rootScope) ->
    $scope.modules
    console.log "111"
    $scope.toogle = (event) ->
      console.log(event.currentTarget)
]