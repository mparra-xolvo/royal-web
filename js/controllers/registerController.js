'use strict';

angular.module('royal-web-dashboard')

.controller('registerController', ['$scope', '$state', 'Auth', '$firebaseObject', 'localStorageService',
	function($scope, $state, Auth, $firebaseObject, localStorageService) {

		$scope.trySignup = function() {

			Auth.$createUserWithEmailAndPassword($scope.email, $scope.password)
			.then(function(firebaseUser) {

				var ref = firebase.database().ref("users/" + firebaseUser.uid);
				ref.set({
				    name: $scope.fullname,
				    email: $scope.email,
				    username : $scope.username,
				    password: $scope.password,
				    createdAt: firebase.database.ServerValue.TIMESTAMP
				  });

				localStorageService.set("username", $scope.username);
				localStorageService.set("password", $scope.password);
				//Auth.$deleteUser();

				$state.go('index.registerBankAccounts');

			})
			.catch(function(error) {
				if (error.code != "auth/email-already-in-use") {
					Auth.$deleteUser()
					.catch(function(error) {
						// Handle error deleting user
					})

				}

				// manage the error. Display some kind of description abou the error
				console.log("There was an error trying to sign up ..." + error);

			})

		}

		$scope.goToLogin = function() {
			$state.go('login');
		};
	}
]);