/**
 * AngularJS App
 */

/*
(function () {
    angular.module('royal-web-dashboard', [
        'ui.router'                   // Routing
    ])
})();
*/

angular
.module('royal-web-dashboard', ['ui.router', 'datatables', 'firebase', 'LocalStorageModule'])

.factory("Auth", ["$firebaseAuth", 
	function($firebaseAuth) {
		return $firebaseAuth();
	}])

.run(['$location', '$rootScope', '$state', function($location, $rootScope, $state){
	// Track page view events
	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

		var path = $location.path();
		var queryString = '';
		var referrer = '';

		//Check if there is a query string
		if (path.indexOf('?') !== -1) {
			queryString = path.substring(path.indexOf('?'), path.length);
		}

		//Check if there is a referrer
		if (fromState.name) {
			referrer = $location.protocol() + '://' + $location.host() + '/#' + fromState.url;
		}

		analytics.page({
			path: path,
			referrer: referrer,
			search: queryString,
			url: $location.absUrl()
		});
	});

	$rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
		// We can catch the error thrown when the $requireSignIn promise is rejected
		// and redirect the user back to the home page
		if (error === "AUTH_REQUIRED") {
			$state.go('login');
		}
	});

}]);

