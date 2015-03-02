'use strict';

describe('Controller: BasicSettingsCtrl', function () {

  // load the controller's module
  beforeEach(module('prosperenceApp'));

  var BasicSettingsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BasicSettingsCtrl = $controller('BasicSettingsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
