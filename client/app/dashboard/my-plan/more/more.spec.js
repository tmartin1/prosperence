'use strict';

describe('Controller: MoreCtrl', function () {

  // load the controller's module
  beforeEach(module('prosperenceApp'));

  var MoreCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MoreCtrl = $controller('MoreCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
