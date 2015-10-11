dmApp.service('mainService', function ($http, Globals) {

    "use strict";
    var url = Globals.remoteRootUrl + "index.php/api/";

    var countObject = function (callback, errback){
        $http({
            method: 'GET',
            url: url + 'site/countObject'
        }).success(callback).error(errback);
    };

    var fetchJobs = function (callback, errback){
        $http({
            method: 'GET',
            url: url + 'job/frontFetchJobs'
        }).success(callback).error(errback);
    };

    var fetchJobsMobile = function (callback, errback){
        $http({
            method: 'GET',
            url: url + 'job/frontFetchJobs',
            params: {
                m: 1
            }
        }).success(callback).error(errback);
    };

    var fetchBlogs = function (callback, errback){
        $http({
            method: 'GET',
            url: url + 'blog/fetchBlogs',
            params: {
                query: "",
                page: 0
            }
        }).success(callback).error(errback);
    };

    return {
        fetchJobs: fetchJobs,
        fetchBlogs: fetchBlogs,
        fetchJobsMobile: fetchJobsMobile
    };
});