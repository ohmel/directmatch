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
            url: url + 'job/frontFetchJobs',
            params: {
                s: 1
            }
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
                page: 0,
                s: 1
            }
        }).success(callback).error(errback);
    };



    var getBlog = function (callback, errback, blogId){
        $http({
            method: 'GET',
            url: url + 'blog/getBlog',
            params: {
                blogId: blogId
            }
        }).success(callback).error(errback);
    };

    var getJob = function (callback, errback, jobId){
        $http({
            method: 'GET',
            url: url + 'job/getJob',
            params: {
                jobId: jobId
            }
        }).success(callback).error(errback);
    };

    return {
        fetchJobs: fetchJobs,
        fetchBlogs: fetchBlogs,
        getBlog: getBlog,
        getJob: getJob,
        fetchJobsMobile: fetchJobsMobile
    };
});