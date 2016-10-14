'use strict';

angular.module('royal-web-dashboard')

.controller('registerBankAccountsController', ['$scope', '$state', '$http', '$sce', 'localStorageService',
	function($scope, $state, $http, $sce, localStorageService) {

		var userToken;
		var fastLinkToken;
		
		integrateFastLink();
		$scope.hideAlert = true;

		$scope.registerBankAccountController = function() {

/*
		    $scope.state = $state;
		    $scope.user = 'Miguel Parra';
*/

		}

		function getFastLinkToken(applicationToken, userToken, appIds) {
			var url = "https://vlxzeqtpc9.execute-api.us-west-2.amazonaws.com/test/fastLink/token?"

			url = url + "appIds=" + appIds;
			url = url + "&applicationToken=" + applicationToken;
			url = url + "&userToken=" + userToken;

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
					fastLinkToken = response.data.user.accessTokens[0].value;
					$scope.fastLinkToken = fastLinkToken;
					//console.log("Fastlink token - " + fastLinkToken);
					renderIFrame();
					$scope.waiting = "true";
				}

			}, function(response) {
				console.log("Error User: " + response.statusText);
			});
			return userToken;
		}

		function authenticateUser(applicationToken, username, password) {
			var url = "https://vlxzeqtpc9.execute-api.us-west-2.amazonaws.com/test/user/login"

			var data = {
				"applicationToken": applicationToken,
				"username": username,
				"password": password
			};

			$http({
				method: "POST",
				url: url,
				data: data
			})
			.then(function(response){
				//console.log("Username - " + username);
				//console.log("Password - " + password);
				if(response.data.errorCode) {
					$scope.hideAlert = false;
					$scope.waiting = "true";
				}
				else {
					userToken = response.data.user.session.userSession;
					$scope.userToken = userToken;
					//console.log("User token - " + userToken);
					getFastLinkToken(applicationToken, userToken, "10003600");
				}
			}, function(response) {
				console.log("Error User: " + response.statusText);
			});
			return userToken;
		}

		function authenticateApplication() {
			var token;
			var url = "https://vlxzeqtpc9.execute-api.us-west-2.amazonaws.com/test/application/login"

			var data = {
				"username": "sbCobmiguelparra",
				"password": "9fff0c71-6441-4761-b4d9-cb300439ee1a"
			};

			$http({
				method: "POST",
				url: url,
				data: data
			})
			.then(function(response){
				token = response.data.session.cobSession;
				//console.log("Application token - " + token);
				authenticateUser(token, localStorageService.get("username"), localStorageService.get("password"));

			}, function(response) {
				console.log("Error Application: " + response.statusText);
			});
			return token;
		}

		function renderIFrame() {
			var javascriptString = "<script>window.onload = function(){ document.forms['add_account'].submit() }</script>";

			var contentHtmlString = "<form name='add_account'action='https://node.developer.yodlee.com/authenticate/restserver/' method='post' id='rsessionPost'>" +
                "<input type='hidden' name='rsession' value='" + userToken + "' id='rsession'/><br/>" +
                "<input type='hidden' name='app' value='10003600' id='finappId'/><br/>" +
                "<input type='hidden' name='redirectReq' value='true'/><br/>" +
                "<input type='hidden' name='token' value='" + fastLinkToken + "' id='token'/><br/>" +
            "</form>"

            var iFrameHtmlString = "<iframe width=\"100%\" height=\"900\" srcdoc=\"<html>" + javascriptString +
            	"<body>" + contentHtmlString + "</body></html>\"></iframe>"

        	$scope.dynamicIFrame = $sce.trustAsHtml(iFrameHtmlString);
		}

		function integrateFastLink() {
			var applicationToken = authenticateApplication();
		}
	}
]);