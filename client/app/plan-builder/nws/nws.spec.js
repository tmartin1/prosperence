'use strict';

describe('Controller: NwsCtrl', function () {

  // load the controller's module
  beforeEach(module('prosperenceApp'));

  var NwsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NwsCtrl = $controller('NwsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
