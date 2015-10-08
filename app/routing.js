/**
 * Created by Ohmel on 7/29/2015.
 */
// configure our routes
dmApp.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'app/js/pages/home.html',
        })
        // route for the about page
        .when('/items', {
            templateUrl : 'app/js/pages/items.html',
            controller  : 'itemsController'
        })
        .when('/job/:jobId', {
            templateUrl : 'app/js/pages/viewJob.html',
            controller  : 'jobManagementController'
        })
        .when('/blog/:blogId', {
            templateUrl : 'app/js/pages/viewBlog.html',
            controller  : 'blogsController'
        })
        .when('/jobs', {
            templateUrl : 'app/js/pages/jobManagement.html',
            controller  : 'jobManagementController'
        })
        .when('/blogs', {
            templateUrl : 'app/js/pages/blogs.html',
            controller  : 'blogsController'
        })
        .when('/contentManagement', {
            templateUrl : 'app/js/pages/contentManagement.html',
        })
        .when('/users', {
            templateUrl : 'app/js/pages/userManager.html',
            controller  : 'userManagerController'
        })
        .when('/applicants', {
            templateUrl : 'app/js/pages/applicants.html',
            controller  : 'applicantsController'
        })
        .when('/applicants/:jobId', {
            templateUrl : 'app/js/pages/applicants.html',
            controller  : 'applicantsController'
        })
        .when('/applicant/:applicantId', {
            templateUrl : 'app/js/pages/viewApplicant.html',
            controller  : 'applicantsController'
        })
        .when('/profile/:userId', {
            templateUrl : 'app/js/pages/profile.html',
            controller  : 'profileController'
        })
        .when('/editJob/:jobId', {
            templateUrl : 'app/js/pages/editJob.html',
            controller  : 'jobManagementController'
        })
        .when('/editBlog/:blogId', {
            templateUrl : 'app/js/pages/editBlog.html',
            controller  : 'blogsController'
        })
        .when('/addJob', {
            templateUrl : 'app/js/pages/addJob.html',
            controller  : 'jobManagementController'
        })
        .when('/addBlog', {
            templateUrl : 'app/js/pages/addBlog.html',
            controller  : 'blogsController'
        })
        .when('/register', {
            templateUrl : 'app/js/pages/register.html',
            controller  : 'registerController'
        })
        .when('/error/:errorCode', {
            templateUrl : 'app/js/pages/error.html',
            controller  : 'errorController'
        })
        // route for the contact page
        .when('/login', {
            templateUrl : 'app/js/pages/login.html',
            controller  : 'loginController'
        });

});