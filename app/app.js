/**
 * Created by Ohmel on 7/29/2015.
 */
// app.js

// create the module and name it scotchApp
var dmApp = angular.module('dmApp', ['ngLinkedIn', 'angular-confirm', 'ngRoute', 'ngAnimate', 'ngDialog', 'ngNotify', 'ngCookies', 'ui.bootstrap', 'ngMessages', 'ui.tinymce']);
dmApp.config(function ($linkedInProvider) {
    $linkedInProvider.set('appKey', '75skho8ig496fz');
});
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
dmApp.controller('mainController', function ($http, $linkedIn, ngNotify, $facebook, $timeout, $location, $scope, Globals, ngDialog, $rootScope, $cookies, mainService) {

    // create a message to display in our view
    $scope.globals = Globals;
    $scope.isLoggedIn = false;
    $scope.blogs = [];
    $scope.jobs = [];
    $scope.job = {};
    $scope.liProfile = {};
    $scope.jobsMobile = [];
    $scope.showJobs = false;
    $scope.showBlogs = false;

    var location = $location.path();
    $scope.jobId = location.replace("/", "");
    $scope.urlSubmit = Globals.remoteRootUrl2 + "/index.php/job/apply/" + $scope.jobId;

    $scope.connect = function (jobId) {
        IN.User.authorize(function (response) {
            mainService.linkedInProfile(
                function (success) {
                    $scope.liProfile = success.values[0];
                    mainService.liApply(
                        function (onSuccess) {
                            if (onSuccess.data == true) {
                                ngDialog.open({
                                    template: '<p>Successfully applied for this job</p>',
                                    plain: true
                                });
                                $linkedIn.logout();
                            }
                        }, function (onError) {
                            ngDialog.open({
                                template: '<p>' + onError.message + '</p>',
                                plain: true
                            });
                            $linkedIn.logout();
                        }, $scope.liProfile, jobId
                    )
                    console.log($scope.liProfile);
                }, function (error) {

                }
            )
        });
    }

    $scope.fbLogin = function (jobId) {
        $facebook.login().then(
            function (response) {
                $facebook.api('/me', {fields: 'email, last_name, first_name, middle_name'}).then(
                    function (response) {
                        mainService.fbApply(
                            function (success) {
                                ngDialog.open({
                                    template: '<p>Successfully applied for this job</p>',
                                    plain: true
                                });
                                $facebook.logout();
                            }, function (error) {
                                ngDialog.open({
                                    template: '<p>Failed to apply for this job</p>',
                                    plain: true
                                });
                                $facebook.logout();
                            }, response, jobId)
                    }
                )
            }, function (error) {
                ngDialog.open({
                    template: '<p>Failed to apply for this job</p>',
                    plain: true
                });
                $facebook.logout();
            }
        )
    }
    $scope.fbShare = function () {
        $facebook.ui({
            method: 'share',
            href: 'https://directmatchoutsourcing.com',
        }).then(
            function (success) {
                alert("success");
            }, function (error) {
                alert("error");
            }
        );
    }


    mainService.fetchJobs(
        function (success) {
            angular.copy(success.data, $scope.jobs);
            mainService.fetchJobsMobile(
                function (success) {
                    angular.copy(success.data, $scope.jobsMobile);
                    setTimeout(function () {
                        $('.owl-testimonials').owlCarousel({
                            singleItem: true,
                            pagination: true,
                            autoPlay: true
                        });
                        $scope.showJobs = true;
                        $scope.$apply();
                    }, 500);

                    //$scope.jobs =
                }, function (error) {

                }, 1);
            //$scope.jobs =
        }, function (error) {

        });

    mainService.getJob(
        function (success) {
            $scope.job = success.data

        }, function (error) {

        }, $scope.jobId
    )

    mainService.fetchBlogs(
        function (success) {
            angular.copy(success.data, $scope.blogs);
            setTimeout(function () {
                $('.owl-twitter').owlCarousel({
                    singleItem: true,
                    pagination: true,
                    autoPlay: true
                });
                $scope.showBlogs = true;
                $scope.$apply();
            }, 500);
        }, function (error) {

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
        function (success) {
            angular.copy(success.data, $scope.blogs);
        }, function (error) {

        });

    mainService.getBlog(
        function (success) {
            $scope.blog = success.data
        }, function (error) {

        }, $scope.blogId
    )
});
// create the controller and inject Angular's $scope
