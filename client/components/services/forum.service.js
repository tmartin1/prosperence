(function () {
  'use strict';

  angular.module('prosperenceApp.service.forum', [])
  .factory('ForumService', function () {
    return {
      getCategories: getCategories
    };

    function getCategories () {
      return ['Debt Management',
        'Retirement Savings',
        'Investing',
        'Life Insurance',
        'Health Insurance',
        'Disability Insurance'
      ];
    }
    
  });

})();
