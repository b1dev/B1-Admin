angular.module("B1Admin").controller "RolesController", [
  "$scope"
  "ngTableParams"
  "$resource"
  "$element"
  "Config"
  "$rootScope"
  "$anchorScroll"
  ($scope,ngTableParams,$resource,$element,Config,$rootScope,$anchorScroll) ->

    alertSelector = "#content-container"

    Item = $resource("#{$element.data("url")}/:id.json",{},{query:{isArray:false},update:{ method:'PUT' }})
    if angular.element("#itemsTable").length
      console.log(angular.element("#itemsTable").length)
      Item.query().$promise.then (data) ->
        $scope.itemsTable = new ngTableParams(
          page: 1 
          count: Config.perPage
          total: 0
        ,
          counts: []
          getData: ($defer, params) ->
            params.total(data.total)
            $defer.resolve(data.items.slice((params.page() - 1) * params.count(), params.page() * params.count()))

        )

    setItem = (item) ->
      $scope.editedItem = item

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

    saveCallback = (resp) ->
      if resp.success
        $scope.itemForm.$setPristine();
        $scope.itemForm.$setUntouched();
        setItem({}) 
        $rootScope.info(alertSelector,resp.msg)
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


    $scope.save = ->
      modules = []
      permissions = []
      angular.forEach $scope.modules, ((parentMod) ->
        angular.forEach parentMod.childs, ((mod) ->
          angular.forEach mod.permissions, ((perm) ->
            if Object.keys($scope.editedItem.permissions).indexOf(String(perm.id)) >= 0
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
            saveCallback(resp)
          , ->
            $rootScope.error(alertSelector,$rootScope.server_error)
        else
          Item.save {item:$scope.editedItem}, (resp) ->
            saveCallback(resp)
          , ->
            $rootScope.error(alertSelector,$rootScope.server_error)
]