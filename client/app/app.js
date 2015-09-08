(function () {
  'use strict';

  angular.module('prosperenceApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'ui.select',
    'prosperenceApp.filter',
    'angularUtils.directives.dirPagination',
    'LocalStorageModule',
    'youtube-embed',
    'btford.socket-io'
  ])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })
  .factory('authInterceptor', function($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers.
      request: function(config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },
      // Intercept 401s and redirect you to login.
      responseError: function(response) {
        if (response.status === 401) {
          $location.path('/');
          // Remove any stale tokens.
          $cookieStore.remove('token');
          return $q.reject(response);
        } else {
          return $q.reject(response);
        }
      }
    };
  })
  .run(function($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in.
    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/');
        }
      });
    });
  })
  .directive('ngEnter', function() {
    return function(scope, element, attrs) {
      element.bind("keydown keypress", function(event) {
        if(event.which === 13) {
          scope.$apply(function(){
              scope.$eval(attrs.ngEnter, {'event': event});
          });
          event.preventDefault();
        }
      });
    };
  });

})();
