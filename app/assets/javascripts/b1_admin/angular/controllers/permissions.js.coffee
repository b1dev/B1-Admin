angular.module("B1Admin").controller "PermissionsController", [
  "$scope"
  '$resource'
  "$timeout"
  "$element"
  "$rootScope"
  "$http"
  "$anchorScroll"
  "$modal"
  ($scope, $resource, $timeout, $element, $rootScope,$http,$anchorScroll,$modal) ->
    alertSelector = "#content-container"
    $scope.items   = []
    $scope.modules = []
    Permission = $resource("#{$element.data("url")}/:id.json",{},{update:{ method:'PUT' }})
    
    loadModules = ->
      Permission.query().$promise.then (data) ->
        $scope.items = data
        modules = []
        angular.forEach data, ((item, key) ->
          items = []
          angular.forEach item.childs, ((mod) ->
            @push {name:item.name + ": " + mod.name,id:mod.id}
          ), items
          @push items
        ), modules
        $scope.modules = [].concat.apply([], modules)
        $rootScope.updateSelect()

    setItem = (item) ->
      $scope.editedItem = item
      $rootScope.updateSelect()

    setActions = (actions) ->
      $scope.actions = actions
      $rootScope.updateSelect(200)

    getModuleId = ->
      $scope.editedItem.module_id
    
    getModuleActions = ->
      $http.post($element.data("actionsUrl"), {id: getModuleId()}).success (resp) ->
        setActions(resp.actions) if resp.success
      .error ->
        $rootScope.error(alertSelector,$rootScope.server_error)

    getRootNodesScope = ->
      angular.element(document.getElementById("tree-root")).scope()

    saveCallback = (resp) ->
      if resp.success
        $scope.permissionForm.$setPristine();
        $scope.permissionForm.$setUntouched();
        setItem({}) 
        loadModules()
        setActions([])
        $rootScope.info(alertSelector,resp.msg)
      else
        $rootScope.error(alertSelector,resp.msg)
      $anchorScroll()

    $scope.destroy = (scope) ->
      data =
        id: scope.$nodeScope.$modelValue.id
        title: "#{$element.data("deleteText")} - #{scope.$nodeScope.$modelValue.desc}"
      $rootScope.confirm(data).result.then ((result) ->
        $rootScope.showLoader()
        Permission.delete {id:scope.$nodeScope.$modelValue.id}, (resp) ->
          loadModules() if resp.success
          $rootScope.info(alertSelector,resp.msg)
          $anchorScroll()
      )

    $scope.collapse = ->
      scope = getRootNodesScope()
      scope.collapseAll()

    $scope.expand = ->
      scope = getRootNodesScope()
      scope.expandAll()

    $scope.edit = (scope)->
      Permission.get {id:scope.$nodeScope.$modelValue.id}, (resp) ->
        setItem(resp)
      , ->
        $rootScope.error(alertSelector,$rootScope.server_error)

  
    $scope.save = ->
      $scope.permissionForm.$setSubmitted()
      if $scope.permissionForm.$valid
        $rootScope.showLoader()
        if $scope.editedItem.id
          Permission.update {id:$scope.editedItem.id},{item:$scope.editedItem}, (resp) ->
            saveCallback(resp)
          , ->
            $rootScope.error(alertSelector,$rootScope.server_error)
        else
          Permission.save {item:$scope.editedItem}, (resp) ->
            saveCallback(resp)
          , ->
            $rootScope.error(alertSelector,$rootScope.server_error)

    $scope.$watch getModuleId, (newVal, oldVal) ->
      getModuleActions() unless newVal is undefined


    setActions([])
    loadModules()
    setItem({module_id:3})
]