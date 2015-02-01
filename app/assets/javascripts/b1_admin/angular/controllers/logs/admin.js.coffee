angular.module("B1Admin").controller "AdminLogsController", [
  "$scope"
  "$resource"
  "$element"
  "ngTableParams"
  "Config"
  ($scope,$resource,$element,ngTableParams,Config) ->
    $scope.filters = {afterDate: new Date(), afterTime: new Date((new Date()).getTime() - 3600*1000)}

    Item = $resource("#{$element.data("url")}/:id.json",{},{query:{isArray:false}})

    if angular.element("#itemsTable").length
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
        
]