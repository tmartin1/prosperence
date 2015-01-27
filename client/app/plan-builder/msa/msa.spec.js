'use strict';

describe('Controller: MsaCtrl', function () {

  // load the controller's module
  beforeEach(module('prosperenceApp'));

  var MsaCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MsaCtrl = $controller('MsaCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
