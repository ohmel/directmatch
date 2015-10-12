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
    $scope.blogs = [];
    $scope.jobs = [];
    $scope.jobsMobile = [];
    $scope.showJobs = false;
    $scope.showBlogs = false;


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

    mainService.fetchBlogs(
        function (success){
            angular.copy(success.data, $scope.blogs);
            setTimeout(function(){
                $('.owl-twitter').owlCarousel({
                    singleItem: true,
                    pagination: true,
                    autoPlay: true
                });
                $scope.showBlogs = true;
                $scope.$apply();
            },500);
        }, function (error){

        });
});

dmApp.controller('blogController', function ($location, $scope, Globals, ngDialog, $rootScope, $cookies, mainService) {

    // create a message to display in our view
    $scope.globals = Globals;
    $scope.isLoggedIn = false;
    $scope.blogs = [];
    $scope.blog = {};
    //$scope.route = $route.current.params;
    $scope.showBlogs = false;
    var location = $location.path();
    $scope.blogId = location.replace("/", "");


    mainService.fetchBlogs(
        function (success){
            angular.copy(success.data, $scope.blogs);
        }, function (error){

        });

    mainService.getBlog(
        function(success){
            $scope.blog = success.data
        }, function(error){

        }, $scope.blogId
    )
});
// create the controller and inject Angular's $scope
