angular.module("B1Admin").controller "RolesController", [
  "$scope"
  "ngTableParams"
  "$resource"
  "$element"
  "Config"
  ($scope,ngTableParams,$resource,$element,Config) ->

    alertSelector = "#content-container"

    Role = $resource("#{$element.data("url")}/:id.json",{},{query:{isArray:false},update:{ method:'PUT' }})

    Role.query().$promise.then (data) ->
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

    $scope.save = ->
      console.log(Object.keys($scope.editedItem.permissions))
      $scope.itemForm.$setSubmitted()
      if $scope.itemForm.$valid
        $rootScope.showLoader()
        if $scope.editedItem.id
          Role.update {id:$scope.editedItem.id},{item:$scope.editedItem}, (resp) ->
            saveCallback(resp)
          , ->
            $rootScope.error(alertSelector,$rootScope.server_error)
        else
          Role.save {item:$scope.editedItem}, (resp) ->
            saveCallback(resp)
          , ->
            $rootScope.error(alertSelector,$rootScope.server_error)


    setItem({permissions:[]})
]