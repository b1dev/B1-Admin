angular.module("B1Admin").controller "LeftPanelController", [
  "$scope"
  ($scope) ->
    $scope.modules = {}
    $scope.toogle = (id) ->
      prev = $scope.modules[id]
      for k, v of $scope.modules
        $scope.modules[k] = false
      $scope.modules[id] = true  unless prev
        
]