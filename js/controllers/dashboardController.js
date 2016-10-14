'use strict';

angular.module('royal-web-dashboard')

.controller('dashboardController', ['$scope', '$state', 
	function($scope, $state) {

		$scope.dashboardController = function() {

/*
		    $scope.state = $state;
		    $scope.user = 'Miguel Parra';
*/

		}

		$scope.goToClients = function() {
			$state.go('index.clients');
		};

		$scope.goToMissingDocuments = function() {
			$state.go('index.missingDocuments');
		};

		$scope.goToDocuments = function(clientId) {
			$state.go('index.allDocuments', {clientId: clientId});
		}
	}
]);