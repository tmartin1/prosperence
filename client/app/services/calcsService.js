angular.module('prosperenceApp')
.factory('CalcsService', function($http) {
  return {
    getRetirementProjection: function(plan) {
      return $http.get('/calcs/retire', { plan: plan })
    }
  };
})
