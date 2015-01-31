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
    Item = $resource("#{$element.data("url")}/:id.json",{},{query:{isArray:false},update:{ method:'PUT' }})
    
    loadItems = ->
      Item.query().$promise.then (data) ->
        $scope.items = data.items
        modules = []
        angular.forEach data.items, ((item, key) ->
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
        $scope.itemForm.$setPristine();
        $scope.itemForm.$setUntouched();
        setItem({}) 
        loadItems()
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
        Item.delete {id:scope.$nodeScope.$modelValue.id}, (resp) ->
          loadItems() if resp.success
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
      Item.get {id:scope.$nodeScope.$modelValue.id}, (resp) ->
        setItem(resp)
      , ->
        $rootScope.error(alertSelector,$rootScope.server_error)

  
    $scope.save = ->
      $scope.itemForm.$setSubmitted()
      if $scope.itemForm.$valid
        $rootScope.showLoader()
        if $scope.editedItem.id
          Item.update {id:$scope.editedItem.id},{item:$scope.editedItem}, (resp) ->
            saveCallback(resp)
          , ->
            $rootScope.error(alertSelector,$rootScope.server_error)
        else
          Item.save {item:$scope.editedItem}, (resp) ->
            saveCallback(resp)
          , ->
            $rootScope.error(alertSelector,$rootScope.server_error)

    $scope.$watch getModuleId, (newVal, oldVal) ->
      getModuleActions() unless newVal is undefined


    setActions([])
    loadItems()
    setItem({module_id:3})
]