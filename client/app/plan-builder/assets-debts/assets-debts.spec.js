'use strict';

describe('Controller: AssetsDebtsCtrl', function () {

  // load the controller's module
  beforeEach(module('prosperenceApp'));

  var AssetsDebtsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AssetsDebtsCtrl = $controller('AssetsDebtsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
