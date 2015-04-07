'use strict';

angular.module('prosperenceApp')
.controller('QuestionViewCtrl', function ($scope, $rootScope, $http, socket, Auth) {

  $scope.deleteQuestion = function(question) {
    $http.delete('/api/questions/' + question._id);
  };

});
