angular.module("B1Admin").controller "ConfirmController", [
  "$scope"
  "$modalInstance"
  "params"
  ($scope,$modalInstance,params) ->
    $scope.title = params.title
    $scope.confirm = ->
      $modalInstance.close(params)
    $scope.cancel = ->
      $modalInstance.dismiss "cancel"
]