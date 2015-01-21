angular.module("B1Admin").controller "ModulesController", [
  "$scope"
  "$http"
  "$element"
  "$window"
  "$rootScope"
  ($scope, $http, $element,$window,$rootScope) ->
    console.log("qwdwq")
  	#Indicates form to show
    $scope.resetPass = false

    # Login model for form
    $scope.login =
      email: ""
      password: ""
      remember_me: false

    #Model for reset password field
    $scope.email = ""

  	# Login action, send AJAX POST request to login url, refresh page on success or show error on fail
    $scope.sign = ->
      $http.post($element.data("loginUrl"), JSON.stringify(login:$scope.login)).success (resp) ->
        $window.location.reload() if resp.success
        $rootScope.error(".cls-content-sm.panel",resp.msg) unless resp.success
      .error ->
      	$rootScope.error(".cls-content-sm.panel",$rootScope.server_error)
        
  	# Resore password action, send AJAX POST request to restore url, show info on success or show error on fail
    $scope.restore = ->
      $http.post($element.data("restoreUrl"), JSON.stringify(email:$scope.email)).success (resp) ->
        $rootScope.info(".cls-content-sm.panel",resp.msg)  if resp.success
        $rootScope.error(".cls-content-sm.panel",resp.msg) unless resp.success
      .error ->
      	$rootScope.error(".cls-content-sm.panel",$rootScope.server_error)
]