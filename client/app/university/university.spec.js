'use strict';

describe('Controller: UniversityCtrl', function() {
  var UniversityCtrl, scope;

  // load the controller's module
  beforeEach(module('prosperenceApp'));


  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    UniversityCtrl = $controller('UniversityCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
