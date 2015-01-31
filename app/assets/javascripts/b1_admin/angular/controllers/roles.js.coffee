angular.module("B1Admin").controller "RolesController", [
  "$scope"
  "ngTableParams"
  "$resource"
  "$element"
  "Config"
  "$rootScope"
  "$anchorScroll"
  "$timeout"
  ($scope,ngTableParams,$resource,$element,Config,$rootScope,$anchorScroll,$timeout) ->

    alertSelector = "#content-container"

    Item = $resource("#{$element.data("url")}/:id.json",{},{query:{isArray:false},update:{ method:'PUT' }})
    if angular.element("#itemsTable").length
      $scope.itemsTable = new ngTableParams(
        page: 1 
        count: Config.perPage
        total: 0
        data: Item.query().$promise.then (data) -> data.items
      ,
        counts: []
        data: Item.query().$promise.then (data) -> data.items
        getData: ($defer, params) ->
          Item.query().$promise.then (data) ->
            params.total(data.total)
            $scope.data = data.items.slice((params.page() - 1) * params.count())

      )

    setItem = (item) ->
      $scope.editedItem = item

    loadItems = ->
      $scope.itemsTable.reload()

    setChecked = (modId,type) ->
      type = type or false
      angular.forEach $scope.modules, ((mod) ->
        angular.forEach mod.childs, ((mod) ->
          if mod.id is modId
            angular.forEach mod.permissions, ((perm) ->
              delete($scope.editedItem.permissions[perm.id]) unless type
              $scope.editedItem.permissions[perm.id] = true if type
            )
        )
      )

    saveCallback = (resp,clear) ->
      if resp.success
        $scope.itemForm.$setPristine() unless clear
        $scope.itemForm.$setUntouched() unless clear
        setItem({}) unless clear
        $rootScope.info(alertSelector,resp.msg)
        $rootScope.setRoute($element.data("url"))
      else
        $rootScope.error(alertSelector,resp.msg)
      $anchorScroll()

    $scope.uncheckAll = (modId) ->
      setChecked(modId)
    $scope.checkAll = (modId) ->
      setChecked(modId,true)

    $scope.edit = (id)->
      Item.get {id:id}, (resp) ->
        setItem(resp)
      , ->
        $rootScope.error(alertSelector,$rootScope.server_error)

    $scope.destroy = (item) ->
      data =
        id: item.id
        title: "#{$element.data("deleteText")} - #{item.desc}"
      $rootScope.confirm(data).result.then ((result) ->
        $rootScope.showLoader()
        Item.delete {id:item.id}, (resp) ->
          loadItems() if resp.success
          $rootScope.info(alertSelector,resp.msg)
          $anchorScroll()
      )

    $scope.save = ->
      modules = []
      permissions = []
      _permissions = []
      angular.forEach Object.keys($scope.editedItem.permissions), ((id) ->
        _permissions.push(id) if $scope.editedItem.permissions[id]
      )
      angular.forEach $scope.modules, ((parentMod) ->
        angular.forEach parentMod.childs, ((mod) ->
          angular.forEach mod.permissions, ((perm) ->
            if _permissions.indexOf(String(perm.id)) >= 0
              modules.push(parentMod.id)
              modules.push(mod.id)
              permissions.push(perm.id)
          )
        )
      )
      $scope.editedItem.permission_ids = permissions
      $scope.editedItem.module_ids     = modules.unique()
      $scope.itemForm.$setSubmitted()
      if $scope.itemForm.$valid
        $rootScope.showLoader()
        if $scope.editedItem.id
          Item.update {id:$scope.editedItem.id},{item:$scope.editedItem}, (resp) ->
            saveCallback(resp,true)
          , ->
            $rootScope.error(alertSelector,$rootScope.server_error)
        else
          Item.save {item:$scope.editedItem}, (resp) ->
            saveCallback(resp)
          , ->
            $rootScope.error(alertSelector,$rootScope.server_error)
]