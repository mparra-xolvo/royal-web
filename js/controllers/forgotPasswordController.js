'use strict';

angular.module('royal-web-dashboard')

.controller('forgotPasswordController', ['$scope', '$state', 
	function($scope, $state) {

		$scope.tryResetPassword = function() {
			console.log("Trying to reset password ...");
		}
	}
]);