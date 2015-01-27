'use strict';

describe('Controller: RiskAnalysisCtrl', function () {

  // load the controller's module
  beforeEach(module('prosperenceApp'));

  var RiskAnalysisCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RiskAnalysisCtrl = $controller('RiskAnalysisCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
