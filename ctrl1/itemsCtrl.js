var demo = angular.module("ItemsApp", []);
demo.controller("ItemsCtrl", function($scope, $http) {

    $scope.initDummyData = function() {
        $scope.items = [{
            name: "dummy1",
            price: "50",
            type: "cat1"
        }, {
            name: "dummy2",
            price: "150",
            type: "cat1"
        }, {
            name: "dummy3",
            price: "800",
            type: "cat2"
        }, {
            name: "dummy4",
            price: "800",
            type: "cat1"
        }, {
            name: "dummy5",
            price: "800",
            type: "cat2"
        }]
    }

    $scope.initData = function() {

        $scope.type = "";
        var str;
        for (var t in $scope.selection) {
            if (t === "0") {
                str = "'" + $scope.selection[t] + "'";
            }
            else {
                str = ",'" + $scope.selection[t] + "'";
            }
            $scope.type = $scope.type.concat(str);
        }

        $scope.url = 'data/conn_manager.php';
        $http.post($scope.url, {
            "type": $scope.type,
            "event": "getItems"
        }).success(function(data, status) {
            $scope.items = data;
            $scope.data = data;
            $scope.status = status;
        }).error(function(data, status) {
            $scope.items = [];
            $scope.data = data || "Request failed";
            $scope.status = status;
        });
    }

    $scope.selection = [];

    // toggle selection for a given fruit by name
    $scope.toggleSelection = function toggleSelection(type) {
        var idx = $scope.selection.indexOf(type);

        // is currently selected
        if (idx > -1) {
            $scope.selection.splice(idx, 1);
        }

        // is newly selected
        else {
            $scope.selection.push(type);
        }
       // $scope.type = $scope.selection.toString();
        $scope.initData();
    };


    $scope.initTypes = function() {
        $scope.url = 'data/conn_manager.php';
        $http.post($scope.url, {
            "event": "getTypes"
        }).success(function(data, status) {
            $scope.types = data;
            $scope.data = data;
            $scope.status = status;
        }).error(function(data, status) {
            $scope.data = data || "Request failed";
            $scope.status = status;
        });
    }
  
    $scope.clearSelection = function(){
        $scope.selection = [];
         $scope.initData();
    }

  $scope.initTypes();
    $scope.clearSelection();

});