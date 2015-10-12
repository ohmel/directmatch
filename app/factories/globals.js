/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
dmApp.factory('Globals', function($location, $http) {
    //root folder Url
    var host = $location.host()+"/";
    var rootUrl;
    if(host === 'localhost/'){
        host = $location.host()+"/icms/";
    }else{
        //take this off when applying to production
        host = $location.host()+"/icms/";
    }
    rootUrl = 'http://'+host;
    var remoteRootUrl = 'http://'+$location.host()+'/cms/';
    var remoteRootUrl2 = 'http://'+$location.host()+'/cms';
    var isNothing = function (obj) {
        // null and undefined are "empty"
        if (obj == null) return true;
        if (obj === {}) return true;

        // Assume if it has a length property with a non-zero value
        // that that property is correct.
        if (obj.length > 0)    return false;
        if (obj.length === 0)  return true;

        // Otherwise, does it have any properties of its own?
        // Note that this doesn't handle
        // toString and valueOf enumeration bugs in IE < 9
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }

        return true;
    };



  return {
      rootUrl : rootUrl,
      remoteRootUrl : remoteRootUrl,
      remoteRootUrl2 : remoteRootUrl2,
      isNothing : isNothing
  };
});

