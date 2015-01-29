angular.module("B1Admin").controller "ModulesController", [
  "$scope"
  '$resource'
  "$timeout"
  "$element"
  "$rootScope"
  "$http"
  "$anchorScroll"
  ($scope, $resource, $timeout, $element, $rootScope,$http,$anchorScroll) ->

    alertSelector = "#content-container"
    $scope.items = []

    Module = $resource("#{$element.data("url")}/:id.json",{},{update:{ method:'PUT' }})
    
    loadModules = ->
      Module.query().$promise.then (data) ->
        $scope.items = data
        $scope.itemsClone = angular.copy($scope.items)

    setItem = (item) ->
      $scope.editedItem = item
      $rootScope.updateSelect()
        

    getRootNodesScope = ->
      angular.element(document.getElementById("tree-root")).scope()

    saveCallback = (resp) ->
      if resp.success
        $scope.moduleForm.$setPristine();
        $scope.moduleForm.$setUntouched();
        setItem({})
        $rootScope.info(alertSelector,resp.msg)  
        loadModules()
      else
        $rootScope.error(alertSelector,resp.msg)
      $anchorScroll()

    $scope.collapse = ->
      scope = getRootNodesScope()
      scope.collapseAll()

    $scope.expand = ->
      scope = getRootNodesScope()
      scope.expandAll()

    $scope.revert = ->
      $scope.items = angular.copy($scope.itemsClone)

    $scope.updatePositions = ->
      $rootScope.showLoader()
      $http.post($element.data("updatePositionsUrl"), JSON.stringify(items:$scope.items)).success (resp) ->
        $rootScope.info(alertSelector,resp.msg)  if resp.success
        $rootScope.error(alertSelector,resp.msg) unless resp.success
        $anchorScroll()
        loadModules()
        setItem({})
      .error ->
        $rootScope.error(alertSelector,$rootScope.server_error)

    $scope.edit = (scope)->
      Module.get {id:scope.$nodeScope.$modelValue.id}, (resp) ->
        setItem(resp)
      , ->
        $rootScope.error(alertSelector,$rootScope.server_error)

    $scope.destroy = (scope) ->
      data =
        id: scope.$nodeScope.$modelValue.id
        title: "#{$element.data("deleteText")} - #{scope.$nodeScope.$modelValue.name}"
      $rootScope.confirm(data).result.then ((result) ->
        $rootScope.showLoader()
        Module.delete {id:scope.$nodeScope.$modelValue.id}, (resp) ->
          loadModules() if resp.success
          $rootScope.info(alertSelector,resp.msg)
          $anchorScroll()
      )
  
    $scope.save = ->
      $scope.moduleForm.$setSubmitted()
      if $scope.moduleForm.$valid
        $rootScope.showLoader()
        if $scope.editedItem.id
          Module.update {id:$scope.editedItem.id},{item:$scope.editedItem}, (resp) ->
            saveCallback(resp)
          , ->
            $rootScope.error(alertSelector,$rootScope.server_error)
        else
          Module.save {item:$scope.editedItem}, (resp) ->
            saveCallback(resp)
          , ->
            $rootScope.error(alertSelector,$rootScope.server_error)


    loadModules()
    setItem({})
]