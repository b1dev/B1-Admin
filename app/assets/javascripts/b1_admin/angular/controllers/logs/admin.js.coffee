angular.module("B1Admin").controller "AdminLogsController", [
  "$scope"
  "$resource"
  "$element"
  "ngTableParams"
  "Config"
  "$modal"
  "$rootScope"
  "$http"
  ($scope,$resource,$element,ngTableParams,Config,$modal,$rootScope,$http) ->

    alertSelector = "#content-container"
    dateFormat = "DD.MM.YYYY HH:mm"

    $scope.filters = {from: moment(new Date()).startOf("day").format(dateFormat), to: moment(new Date()).endOf("day").format(dateFormat)}
    filtersClone = angular.copy $scope.filters
    $scope.statusColors = 
      1: "#4EAE32"
      2: "#EED80B"
      3: "#D85C28"
      4: "#FF0101"
      
    Item = $resource("#{$element.data("url")}/:id.json",{},{query:{isArray:false}})

    setActions = (actions) ->
      $scope.actions = actions
      $rootScope.updateSelect(200)

    getController = ->
      $scope.filters.controller
    
    getModuleActions = ->
      $http.post($element.data("actionsUrl"), {id: getController()}).success (resp) ->
        setActions(resp.actions) if resp.success
      .error ->
        $rootScope.error(alertSelector,$rootScope.server_error)

    $scope.itemsTable = new ngTableParams(
      page: 1 
      count: Config.perPage
      total: 0
    ,
      counts: []
      getData: ($defer, params) ->
        $scope.itemsPromise = Item.query(
          page: params.page()
          filters: $scope.filters
        ).$promise.then (data) ->
          params.total(data.total)
          $scope.data = data.items

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
      $scope.itemsTable.reload()

    $scope.reset = ->
      $scope.itemsTable.page(1)
      $scope.filters = angular.copy filtersClone
      $scope.itemsTable.reload()
      $rootScope.updateSelect(200)

    $scope.$watch getController, (newVal, oldVal) ->
      getModuleActions() unless newVal is undefined

    $scope.$watch "filters.from" , (newVal, oldVal) ->
      $scope.filters.to = moment(newVal).endOf("day").format(dateFormat)
    ,true
    $scope.$watch "filters.status" , (newVal, oldVal) ->
      $scope.filters.status = newVal.replace("_","") if newVal
    ,true


    $scope.$watch "testObj", (newVal, oldVal) ->
      $scope.filters.user_id = newVal.originalObject.id if newVal
      delete $scope.filters.user_id unless newVal
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