'use strict';

describe('Controller: SpendingCtrl', function () {

  // load the controller's module
  beforeEach(module('prosperenceApp'));

  var SpendingCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SpendingCtrl = $controller('SpendingCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
