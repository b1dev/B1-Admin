angular.module("B1Admin").controller "ModulesController", [
  "$scope"
  '$resource'
  "$timeout"
  "$element"
  "$rootScope"
  "$http"
  "$anchorScroll"
  ($scope, $resource, $timeout, $element, $rootScope,$http,$anchorScroll) ->
    
    $scope.items = []

    Module = $resource("#{$element.data("url")}/:id.json",{},{query: {isArray: false },update:{ method:'PUT' }})
    
    loadModules = ->
      Module.query().$promise.then (data) ->
        $scope.items = data.items
        $scope.itemsClone = clone data.items

    setItem = (item) ->
      $scope.editedItem = item
      $timeout (->
        $('.selectpicker').selectpicker("refresh");
      ), 100
        

    getRootNodesScope = ->
      angular.element(document.getElementById("tree-root")).scope()

    saveCallback = (resp) ->
      if resp.success
        $scope.moduleForm.$setPristine();
        $scope.moduleForm.$setUntouched();
        setItem({})
        $rootScope.info("#content-container",resp.msg)  
        loadModules()
      else
        $rootScope.error("#content-container",resp.msg)
      $anchorScroll()

    $scope.remove = (scope) ->
      scope.remove()

    $scope.toggle = (scope) ->
      scope.toggle()

    $scope.collapse = ->
      scope = getRootNodesScope()
      scope.collapseAll()

    $scope.expand = ->
      scope = getRootNodesScope()
      scope.expandAll()

    $scope.revert = ->
      $scope.items = clone $scope.itemsClone

    $scope.updatePositions = ->
      $rootScope.showLoader()
      $http.post($element.data("updatePositionsUrl"), JSON.stringify(items:$scope.items)).success (resp) ->
        $rootScope.info("#content-container",resp.msg)  if resp.success
        $rootScope.error("#content-container",resp.msg) unless resp.success
        $anchorScroll()
        loadModules()
        setItem({})
      .error ->
        $rootScope.error("#content-container",$rootScope.server_error)

    $scope.edit = (scope)->
      Module.get {id:scope.$nodeScope.$modelValue.id}, (resp) ->
        setItem(resp)
      , ->
        $rootScope.error("#content-container",$rootScope.server_error)

  
    $scope.save = ->
      $scope.moduleForm.$setSubmitted()
      if $scope.moduleForm.$valid
        $rootScope.showLoader()
        if $scope.editedItem.id
          Module.update {id:$scope.editedItem.id},{item:$scope.editedItem}, (resp) ->
            saveCallback(resp)
          , ->
            $rootScope.error("#content-container",$rootScope.server_error)
        else
          Module.save {item:$scope.editedItem}, (resp) ->
            saveCallback(resp)
          , ->
            $rootScope.error("#content-container",$rootScope.server_error)


    loadModules()
    setItem({})
]