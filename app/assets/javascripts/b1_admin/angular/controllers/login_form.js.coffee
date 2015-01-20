angular.module("B1Admin").controller "LoginFormController", [
  "$scope"
  "$http"
  "$element"
  ($scope, $http, $element) ->
    $scope.sign = ->
      $http.post($element.data("loginUrl"), JSON.stringify($scope.login)).success (resp) ->
        console.log resp


    $scope.login =
      email: ""
      password: ""
      remember_me: false


]