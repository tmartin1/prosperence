'use strict';

describe('Controller: FavoritesCtrl', function() {

  // load the controller's module
  beforeEach(module('prosperenceApp'));

  var FavoritesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    FavoritesCtrl = $controller('FavoritesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
