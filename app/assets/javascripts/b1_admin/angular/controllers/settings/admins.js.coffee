angular.module("B1Admin").controller "AdminsController", [
  "$scope"
  "ngTableParams"
  "$resource"
  "$element"
  "Config"
  "$rootScope"
  "$anchorScroll"
  "$http"
  ($scope,ngTableParams,$resource,$element,Config,$rootScope,$anchorScroll,$http) ->

    alertSelector = "#content-container"
    $scope.statusColors = 
      1: "#4EAE32"
      2: "#EED80B"
      3: "#D85C28"
      4: "#FF0101"
      
    Item = $resource("#{$element.data("url")}/:id.json",{},{query:{isArray:false},update:{ method:'PUT' }})
    if angular.element("#itemsTable").length
      $scope.itemsTable = new ngTableParams(
        page: 1 
        count: Config.perPage
        total: 0
      ,
        counts: []
        getData: ($defer, params) ->
          $scope.itemsPromise = Item.query().$promise.then (data) ->
            params.total(data.total)
            $scope.data = data.items.slice((params.page() - 1) * params.count())

      )
    if angular.element("#subitemsTable").length
      $scope.subitemsTable = new ngTableParams(
        page: 1 
        count: Config.perPage
        total: 0
      ,
        counts: []
        getData: ($defer, params) ->
          $http.post($element.data("historyUrl"), {id: $scope.editedItem.id}).success (resp) ->
            if resp.success
              params.total(resp.total)
              $scope.subData = resp.items.slice((params.page() - 1) * params.count())

      )


    setItem = (item) ->
      $scope.editedItem = item

    loadItems = ->
      $scope.itemsTable.reload()

    setChecked = (modId,type) ->
      type = type or false
      angular.forEach $scope.roles, ((role) ->
        delete($scope.editedItem.roles[role.id]) unless type
        $scope.editedItem.roles[role.id] = true if type
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

    $scope.uncheckAll = (roleId) ->
      console.log($scope.editedItem,$scope.roles)
      setChecked(roleId)
    $scope.checkAll = (roleId) ->
      setChecked(roleId,true)


    $scope.edit = (id)->
      Item.get {id:id}, (resp) ->
        setItem(resp)
      , ->
        $rootScope.error(alertSelector,$rootScope.server_error)

    $scope.destroy = (item) ->
      data =
        id: item.id
        title: "#{$element.data("deleteText")} - #{item.name}"
      $rootScope.confirm(data).result.then ((result) ->
        $rootScope.showLoader()
        Item.delete {id:item.id}, (resp) ->
          loadItems() if resp.success
          $rootScope.info(alertSelector,resp.msg)
          $anchorScroll()
      )

    $scope.save = ->
      $scope.editedItem.role_ids = Object.keys($scope.editedItem.roles)
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