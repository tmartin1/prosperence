'use strict';

describe('Controller: PathsCtrl', function() {

  // load the controller's module
  beforeEach(module('prosperenceApp'));

  var PathsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    PathsCtrl = $controller('PathsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
