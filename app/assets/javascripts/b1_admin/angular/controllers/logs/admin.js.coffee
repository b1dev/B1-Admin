angular.module("B1Admin").controller "AdminLogsController", [
  "$scope"
  "$resource"
  "$element"
  "ngTableParams"
  "Config"
  "$modal"
  "$rootScope"
  ($scope,$resource,$element,ngTableParams,Config,$modal,$rootScope) ->

    alertSelector = "#content-container"
    console.log($scope.statuses)
    $scope.filters = {afterDate: new Date(), afterTime: new Date((new Date()).getTime() - 3600*1000)}

    $scope.statusColors = 
      1: "#4EAE32"
      2: "#EED80B"
      3: "#D85C28"
      4: "#FF0101"
      
    Item = $resource("#{$element.data("url")}/:id.json",{},{query:{isArray:false}})

    $scope.itemsTable = new ngTableParams(
      page: 1 
      count: Config.perPage
      total: 0
    ,
      counts: []
      getData: ($defer, params) ->
        Item.query().$promise.then (data) ->
          params.total(data.total)
          $scope.data = data.items.slice((params.page() - 1) * params.count())

    )

    $scope.show = (item) ->
      Item.get {id:item.id}, (resp) ->
        $modal.open(
          templateUrl: "adminLog.html"
          controller: "AdminLogController"
          size: "lg"
          resolve:
            item: -> resp
        )
      , ->
        $rootScope.error(alertSelector,$rootScope.server_error)
    $scope.filter = ->
      console.log($scope.statuses)
]


angular.module("B1Admin").controller "AdminLogController", [
  "$scope"
  "$modalInstance"
  "item"
  ($scope,$modalInstance,item) ->
    $scope.item = item
    $scope.confirm = ->
      $modalInstance.close(item)
    $scope.cancel = ->
      $modalInstance.dismiss "cancel"
]