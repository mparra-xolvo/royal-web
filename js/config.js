/**
 * AngularJS Configuration
 */
function config($stateProvider, $urlRouterProvider) {
    
    //$urlRouterProvider.otherwise("/index/first");
    $urlRouterProvider.otherwise("/login");

    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "views/login.html",
            controller: "loginController"
        })
        .state('forgotPassword', {
            url:"/forgotPassword",
            templateUrl: "views/forgotPassword.html",
            controller: "forgotPasswordController"
        })
        .state('register', {
            url:"/register",
            templateUrl: "views/register.html",
            controller: "registerController"
        })

        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "views/partials/wrapper.html",
            controller: "mainController"
        })

        .state('index.dashboard', {
            url: "/dashboard",
            templateUrl: "views/dashboard.html",
            controller: "dashboardController",
            resolve: {
                // controller will not be loaded until $requireSignIn resolves
                // Auth refers to our $firebaseAuth wrapper in the factory below
                "currentAuth": ["Auth", function(Auth) {
                  // $requireSignIn returns a promise so the resolve waits for it to complete
                  // If the promise is rejected, it will throw a $stateChangeError (see above)
                  return Auth.$requireSignIn();
                }]
            }
        })

        .state('index.listTransactions', {
            url: "/listTransactions",
            templateUrl: "views/listTransactions.html",
            controller: "listTransactionsController",
            resolve: {
                // controller will not be loaded until $requireSignIn resolves
                // Auth refers to our $firebaseAuth wrapper in the factory below
                "currentAuth": ["Auth", function(Auth) {
                  // $requireSignIn returns a promise so the resolve waits for it to complete
                  // If the promise is rejected, it will throw a $stateChangeError (see above)
                  return Auth.$requireSignIn();
                }]
            }
        })

        .state('index.registerBankAccounts', {
            url: "/registerBankAccounts",
            templateUrl: "views/registerBankAccounts.html",
            controller: "registerBankAccountsController",
            resolve: {
                // controller will not be loaded until $requireSignIn resolves
                // Auth refers to our $firebaseAuth wrapper in the factory below
                "currentAuth": ["Auth", function(Auth) {
                  // $requireSignIn returns a promise so the resolve waits for it to complete
                  // If the promise is rejected, it will throw a $stateChangeError (see above)
                  return Auth.$requireSignIn();
                }]
            }
        })
};

angular
    .module('royal-web-dashboard')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });
