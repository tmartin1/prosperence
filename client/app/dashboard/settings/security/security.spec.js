'use strict';

describe('Controller: SecurityCtrl', function () {

  // load the controller's module
  beforeEach(module('prosperenceApp'));

  var SecurityCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SecurityCtrl = $controller('SecurityCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
