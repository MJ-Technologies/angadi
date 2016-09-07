function CustomerCtrl($scope, $http) {
	$scope.url = 'data/conn_manager.php';
	$scope.login = function() {
		$http.post($scope.url, {
			"loginemail" : $scope.loginemail,
			"loginpassword" : $scope.loginpassword,
			"event" : "login"
		}).success(function(data, status) {
			$scope.status = status;
			$scope.data = data;
			if(status == 200 && data == 'success'){
				$scope.result1 = "Login Success!";
				$location.path('home.html');
			}else{
				$scope.result1 = "Login Failed. Try again!";
			}
		}).error(function(data, status) {
			$scope.data = data || "Request failed";
			$scope.status = status;
		});
	};
	$scope.signup = function() {
		$http.post($scope.url, {
			"name" : $scope.name,
			"phone" : $scope.phone,
			"email" : $scope.email,
			"address" : $scope.address,
			"password" : $scope.password,
			"event" : "signup"
		}).success(function(data, status) {
			$scope.status = status;
			$scope.data = data;
			if(status == 200 && data == 'success'){
				$scope.result2 = "Signup Success!";
				$location.path('home.html');
			}else{
				$scope.result2 = "Signup Failed. Try again!";
			}
		}).error(function(data, status) {
			$scope.data = data || "Request failed";
			$scope.status = status;
		});
	};
	$scope.clearSignup = function() {
		$scope.name = '';
		$scope.phone = '';
		$scope.email = '';
		$scope.address = '';
		$scope.password = '';
		$scope.cnfpassword = '';
	};
}
