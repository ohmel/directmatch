/**
 * Created by Ohmel on 7/29/2015.
 */
// app.js

// create the module and name it scotchApp
var dmApp = angular.module('dmApp', ['angular-confirm', 'ngRoute', 'ngAnimate', 'ngDialog', 'ngNotify', 'ngCookies', 'ui.bootstrap', 'ngMessages', 'ui.tinymce']);
dmApp.filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);
dmApp.run(function ($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
        $rootScope.currentRoute = current.$$route.originalPath;
    });

});

/**
 * Created by Ohmel on 7/29/2015.
 */
dmApp.controller('mainController', function ($timeout, $location, $scope, Globals, ngDialog, $rootScope, $cookies, mainService) {

    // create a message to display in our view
    $scope.globals = Globals;
    $scope.isLoggedIn = false;
    $scope.jobs = [];
    $scope.jobsMobile = [];
    $scope.ohmel = "sdafadsfadsf";
    $scope.showJobs = false;


    mainService.fetchJobs(
        function (success) {
            angular.copy(success.data, $scope.jobs);
            mainService.fetchJobsMobile(
                function (success) {
                    angular.copy(success.data, $scope.jobsMobile);
                    setTimeout(function(){
                        $('.owl-testimonials').owlCarousel({
                            singleItem: true,
                            pagination: true,
                            autoPlay: true
                        });
                        $scope.showJobs = true;
                        $scope.$apply();
                    },500);

                    //$scope.jobs =
                }, function (error) {

                });


            //$scope.jobs =
        }, function (error) {

        });





});
// create the controller and inject Angular's $scope
