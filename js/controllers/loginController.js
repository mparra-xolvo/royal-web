'use strict';

angular.module('royal-web-dashboard')

.controller('loginController', ['$scope', '$state', '$firebaseAuth', '$firebaseObject',
	'localStorageService',
	function($scope, $state, $firebaseAuth, $firebaseObject, localStorageService) {

		var auth = $firebaseAuth();
		$scope.hideAlert = true;

		function setUsernameAndPassword(userId) {
			var ref = firebase.database().ref('/users/' + userId);

			//var username = $firebaseObject(ref.child("username")).$value;
			//var username = ref.child("username").$value;
			//var password = ref.child("password").$value;


			ref.once('value')
			.then(function(snapshot) {
				var username = snapshot.val().username;
				var password = snapshot.val().password;

				localStorageService.set("username", username);
				localStorageService.set("password", password);
			})

		}

		$scope.tryLogin = function() {

			auth.$signInWithEmailAndPassword($scope.email, $scope.password)
			.then(function(authenticatedUser) {
				var user = {};

				$scope.hideAlert = true;
				setUsernameAndPassword(authenticatedUser.uid);

				user.id = authenticatedUser.uid;
				user.email = $scope.email;

				analytics.identify(user.id, {
						email: $scope.email
				}, function() {
					$state.go('index.dashboard');
				});

			})
			.catch(function(error) {
				$scope.messageDetails = error.message;
				$scope.hideAlert = false;
			}) 

		}

		$scope.goToForgotPassword = function() {
			$state.go('forgotPassword');
		};

		$scope.goToRegister = function() {
			$state.go('register');
		};
	}
]);