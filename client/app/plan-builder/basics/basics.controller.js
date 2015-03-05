'use strict';

angular.module('prosperenceApp')
.controller('BasicsCtrl', function($scope) {
  $scope.user.plan = $scope.user.plan || {};
  $scope.user.personal = $scope.user.personal || {};

  // Array of question objects to be asked in the 'Personal Info' section.
  $scope.queries = [{
    title: 'Personal Information',
    type: 'multi',
    subqueries: [{
      question: 'What is your first name?',
      type: 'text',
      bind: 'firstName'
    }, {
      question: 'What is your last name?',
      type: 'text',
      bind: 'lastName'
    }, {
      question: 'What is your date of birth?',
      type: 'date',
      bind: 'birthdate'
    }]
  }, {
    title: 'Family',
    type: 'multi',
    subqueries: [{
      question: 'Are you maried?',
      type: 'select',
      bind: 'married',
      options: [{
        text: 'Yes',
        value: true
      }, {
        text: 'No',
        value: false
      }]
    }, {
      question: 'What is your spouse\'s first name?',
      type: 'text',
      bind: 'spouseFirstName',
      condition: 'married'
    }, {
      question: 'What is your spouse\'s last name?',
      type: 'text',
      bind: 'spouseLastName',
      condition: 'married'
    }, {
      question: 'What is your spouce\'s date of birth?',
      type: 'date',
      bind: 'spouseBirthdate',
      condition: 'married'
    }, {
      // Removed spouse resident questions for now, cann add back later.
      // 	question: 'In which city does ' + $scope.plan.spouseFirstName +
      // 		' live?',
      // 	type: 'text',
      // 	bind: 'spouseCityResident',
      // 	condition: 'married'
      // }, {
      // 	question: 'In which state does ' + $scope.plan.spouseFirstName +
      // 		' live?',
      // 	type: 'select',
      // 	bind: 'spouseStateResident',
      // 	condition: 'married',
      // 	options: $scope.states
      // }, {
      question: 'Do you have children?',
      type: 'select',
      bind: 'hasChildren',
      options: [{
        text: 'Yes',
        value: true
      }, {
        text: 'No',
        value: false
      }]
    }, {
      bind: 'children',
      type: 'table',
      fields: [{
        label: 'Child Name',
        type: 'text',
        textAlign: 'left'
      }, {
        label: 'Child Birthdate',
        type: 'date',
        textAlign: 'left'
      }],
      condition: 'hasChildren'
    }]
  }, {
    title: 'Residence and Work Location',
    type: 'multi',
    subqueries: [{
      question: 'In which city do you live?',
      type: 'text',
      bind: 'residentAddress.city'
    }, {
      question: 'In which state do you live?',
      type: 'select',
      bind: 'residentAddress.state',
      options: $scope.states
    }, {
      question: 'Do you work in a different state than you live?',
      bind: 'sameWorkResidence',
      type: 'select',
      options: [{
        text: 'Yes',
        value: true
      }, {
        text: 'No',
        value: false
      }]
    }, {
      question: 'In which city do you work?',
      type: 'text',
      bind: 'workAddress.city',
      condition: 'sameWorkResidence'
    }, {
      question: 'In which state do you work?',
      type: 'select',
      bind: 'workState',
      options: $scope.states,
      condition: 'workAddress.state'
    }]
  }];

});
