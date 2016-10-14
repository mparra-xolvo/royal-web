/**
 * AngularJS Controllers
 */

/*
 * Main controler
 */
function MainController($scope, $state) {
    this.welcomeText = 'Welcome to the Royal Dashboard';
    $scope.state = $state;
    $scope.user = 'Miguel Parra';
};

angular.module('royal-web-dashboard')

.controller('mainController', ['$scope', '$state', '$firebaseAuth', 'localStorageService',
	function($scope, $state, $firebaseAuth, localStorageService) {

	// $scope.goToLogin = function() {
		
	// 	analytics.track('logout', {
	// 		firstName: 'Test',
	// 		lastName: 'Test',
	// 		email: 'test@test.com'
	// 	}, function() {
	// 		$state.go('login');
	// 	});
	// }

	$scope.logout = function() {
		localStorageService.clearAll();
		$firebaseAuth().$signOut();

		analytics.track('logout', {
			firstName: 'Test',
			lastName: 'Test',
			email: 'test@test.com'
		}, function() {
			$state.go('login');
		});		
	}



}]);
