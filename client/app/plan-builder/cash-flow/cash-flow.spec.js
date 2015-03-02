'use strict';

describe('Controller: CashFlowCtrl', function () {

  // load the controller's module
  beforeEach(module('prosperenceApp'));

  var CashFlowCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CashFlowCtrl = $controller('CashFlowCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
