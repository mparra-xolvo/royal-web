'use strict';

angular.module('royal-web-dashboard')

.controller('listTransactionsController', ['$scope', '$state', '$http', 'localStorageService',
	function($scope, $state, $http, localStorageService) {

		tryListTransactions();

		$scope.listTransactionsController = function() {

/*
		    $scope.state = $state;
		    $scope.user = 'Miguel Parra';
*/

		}

		function tryListTransactions() {
			var url = "https://vlxzeqtpc9.execute-api.us-west-2.amazonaws.com/test/transactions?"

			url = url + "username=" + encodeURIComponent(localStorageService.get("username"));
			url = url + "&password=" + encodeURIComponent(localStorageService.get("password"));

			$http({
				method: "GET",
				url: url
			})
			.then(function(response){
				if (response.data.errorMessage) {
					$scope.hideAlert = false;
					$scope.waiting = "true";
					console.log("Error - " + response.data.errorMessage);
				} else {
					$scope.transactions = response.data.transaction;
					$scope.waiting = "true";
				}

			}, function(response) {
				console.log("Error Retrieving Transactions: " + response.statusText);
			});
		}

	}
]);