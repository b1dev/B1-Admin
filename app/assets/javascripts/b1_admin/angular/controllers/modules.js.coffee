angular.module("B1Admin").controller "ModulesController", [
  "$scope"
  '$resource'
  "$http"
  "$element"
  "$rootScope"
  ($scope, $resource, $http, $element, $rootScope) ->

    $scope.items = []

    Module = $resource("#{$element.data("url")}.json",{},{query: {isArray: false }})

    Module.query().$promise.then (data) ->
      $scope.items = data.items
      $scope.itemsClone = clone data.items

    $scope.remove = (scope) ->
      scope.remove()

    $scope.toggle = (scope) ->
      scope.toggle()

    getRootNodesScope = ->
      angular.element(document.getElementById("tree-root")).scope()

    $scope.collapse = ->
      scope = getRootNodesScope()
      scope.collapseAll()

    $scope.expand = ->
      scope = getRootNodesScope()
      scope.expandAll()

    $scope.revert = ->
      $scope.items = clone $scope.itemsClone

    $scope.updatePositions = ->
      $http.post($element.data("updatePositionsUrl"), JSON.stringify(items:$scope.items)).success (resp) ->
        $rootScope.info(".cls-content-sm.panel",resp.msg)  if resp.success
        $rootScope.error(".cls-content-sm.panel",resp.msg) unless resp.success
]