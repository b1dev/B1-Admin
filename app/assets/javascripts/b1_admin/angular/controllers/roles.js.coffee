angular.module("B1Admin").controller "RolesController", [
  "$scope"
  "ngTableParams"
  "$resource"
  "$element"
  "Config"
  ($scope,ngTableParams,$resource,$element,Config) ->

    Role = $resource("#{$element.data("url")}/:id.json",{},{query:{isArray:false},update:{ method:'PUT' }})
    $scope.params = new ngTableParams()
    Role.query().$promise.then (data) ->
      $scope.itemsTable = new ngTableParams(
        page: 1 
        count: Config.perPage
        total: 0
      ,
        counts: []
        getData: ($defer, params) ->
          params.total(data.total)
          #$defer.resolve(data.items.slice((params.page() - 1) * params.count(), params.page() * params.count()));
          $defer.resolve(data.items.slice((params.page() - 1) * params.count(), params.page() * params.count()))

      )

    # $scope.itemsTable = new ngTableParams(
    #   page: 1 # show first page
    #   count: 25 # count per page
    # ,
    #   getData: ($defer, params) ->
    #     data = Role.query(
    #       limit: params.count()
    #       offset: (params.page() - 1) * params.count()
    #       order: params.sorting()
    #     ).$promise.then (data) ->
    #       params.total(data.total)
    #       $defer.resolve data.items.slice((params.page() - 1) * params.count(), params.page() * params.count())
    #       console.log($defer)

    # )
]