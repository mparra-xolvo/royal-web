/**
 * AngularJS Directives
 */

/**
 * Directive to run MetisMenu
 */
function metisMenu($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            $timeout(function(){
                element.metisMenu();
            })
        }
    };
}

/*
 * Directive to set the title
 */
function pageTitle($rootScope, $timeout) {
    return {
        link: function(scope, element) {
            var listener = function(event, toState, fromState, toParams, fromParams) {
                var title = 'Royal Dashboard | Home';
                if (toState.data && toState.data.pageTitle) {
                    title = 'Royal Dashboard | ' + toState.data.pageTitle;
                }
                $timeout(function() {element.text(title);});
            };
            $rootScope.$on('$stateChangeStart', listener);
        }
    }
}

/*
 * Directive to collapse sidebar
 */
function collapseSidebar($timeout) {
    return {
        restrict: 'A',
        template: '<a class="sidebar-minimalizer btn btn-theme" href="" ng-click="collapseSidebar()"><i class="fa"></i></a>',
        controller: function ($scope, $element) {
            $scope.collapseSidebar = function () {
                $("#wrapper").toggleClass("mini-sidebar");
                if (!$('#wrapper').hasClass('mini-sidebar') || $('#wrapper').hasClass('body-small')) {
                    $('#side-nav').hide();
                    $('.sidebar-nav-logo').hide();
                    $('.sidebar-nav-profile').hide();
                    setTimeout(function () {$('#side-nav').fadeIn(500);}, 100);
                    setTimeout(function () {$('.sidebar-nav-logo').fadeIn(500);}, 100);
                    setTimeout(function () {$('.sidebar-nav-profile').fadeIn(500);}, 100);
                } else {
                    $('#side-nav').removeAttr('style');
                }
            }
        }
    }
}


/*
 * Directive to show profile settings
 */
function profileToggler($timeout) {
    return {
        restrict: 'A',
        template: '<a href="" ng-click="profileToggler()">{{user}}<i id="user-profile-settings-toggler" class="fa fa-caret-down l-pad-5"></i></a>',
        controller: function ($scope, $element) {
            $scope.profileToggler = function () {
                $('.side-nav-profile-settings').slideToggle("fast");
                if ($('#user-profile-settings-toggler').hasClass('fa-caret-down')) {
                    $('#user-profile-settings-toggler').removeClass('fa-caret-down');
                    $('#user-profile-settings-toggler').addClass('fa-caret-up');
                } else {
                    $('#user-profile-settings-toggler').addClass('fa-caret-down');
                    $('#user-profile-settings-toggler').removeClass('fa-caret-up');
                }
            }
        }
    }
}

/*
 * Directive to show profile settings
 */
function fullScreenToggler($timeout) {
    return {
        restrict: 'A',
        template: '<a id="fullscreen-toggler" class="btn btn-default btn-bordered" ng-click="fullScreenToggler()"><span class="fa fa-arrows-alt"></span></a>',
        controller: function ($scope, $element) {
            $scope.fullScreenToggler = function () {
                $('#fullscreen-toggler').click(function(){
                var elem = document.body; // Make the body go full screen.
                var isInFullScreen = (document.fullScreenElement && document.fullScreenElement !== null) ||  (document.mozFullScreen || document.webkitIsFullScreen);
                if (isInFullScreen) {
                    var requestMethod = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || document.exitFullscreen;
                    if (requestMethod) { // cancel full screen.
                        requestMethod.call(document);
                    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
                        var wscript = new ActiveXObject("WScript.Shell");
                        if (wscript !== null) {
                            wscript.SendKeys("{F11}");
                        }
                    }
                } else {
                    var requestMethod = elem.requestFullScreen || elem.webkitRequestFullScreen || elem.mozRequestFullScreen || elem.msRequestFullscreen;
                    if (requestMethod) { // Native full screen.
                        requestMethod.call(elem);
                    } else if (typeof window.ActiveXObject !== "undefined") {
                        var wscript = new ActiveXObject("WScript.Shell");
                        if (wscript !== null) {
                            wscript.SendKeys("{F11}");
                        }
                    }
                    return false;
                }
                return false;
            });
            }
        }
    }
}

/*
 * Add directives to the module
 */
angular.module('royal-web-dashboard')
    .directive('collapseSidebar', collapseSidebar)
    .directive('profileToggler', profileToggler)
    .directive('fullScreenToggler', fullScreenToggler)
    .directive('pageTitle', pageTitle)
    .directive('metisMenu', metisMenu);