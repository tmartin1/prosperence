'use strict';

angular.module('prosperenceApp')
.controller('BasicsCtrl', function($scope) {
  $scope.user.plan = $scope.user.plan || {};
  $scope.user.personal = $scope.user.personal || {};

  // Array of question objects to be asked in the 'Personal Info' section.
  $scope.queries = [{
    title: 'Personal Information',
    type: 'multi',
    bind: 'personal',
    subqueries: [{
      question: 'What is your first name?',
      type: 'text',
      bind: 'firstname'
    }, {
      question: 'What is your last name?',
      type: 'text',
      bind: 'lastname'
    }, {
      question: 'What is your date of birth?',
      type: 'date',
      bind: 'birthdate'
    }]
  }, {
    title: 'Family',
    type: 'multi',
    bind: 'personal',
    subqueries: [{
      question: 'Are you maried?',
      type: 'select',
      bind: 'maritalStatus',
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
      condition: 'maritalStatus'
    }, {
      question: 'What is your spouse\'s last name?',
      type: 'text',
      bind: 'spouseLastName',
      condition: 'maritalStatus'
    }, {
      question: 'What is your spouce\'s date of birth?',
      type: 'date',
      bind: 'spouseBirthdate',
      condition: 'maritalStatus'
    }, {
      // Removed spouse resident questions for now, cann add back later.
      // 	question: 'In which city does ' + $scope.plan.spouseFirstName +
      // 		' live?',
      // 	type: 'text',
      // 	bind: 'spouseCityResident',
      // 	condition: 'maritalStatus'
      // }, {
      // 	question: 'In which state does ' + $scope.plan.spouseFirstName +
      // 		' live?',
      // 	type: 'select',
      // 	bind: 'spouseStateResident',
      // 	condition: 'maritalStatus',
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
    title: 'Work and Residence',
    type: 'multi',
    bind: 'personal',
    subqueries: [{
      question: 'In which city do you live?',
      type: 'text',
      bind: 'cityResident'
    }, {
      question: 'In which state do you live?',
      type: 'select',
      bind: 'stateResident',
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
      bind: 'cityWork',
      condition: 'sameWorkResidence'
    }, {
      question: 'In which state do you work?',
      type: 'select',
      bind: 'stateWork',
      options: $scope.states,
      condition: 'sameWorkResidence'
    }, {
      question: 'What is your Gross Annual Income?',
      type: 'number',
      bind: 'grossAnnualIncome'
    }, {
      question: 'What is your spouse\'s Gross Annual Income?',
      type: 'number',
      bind: 'spouseGrossAnnualIncome',
      condition: 'maritalStatus'
    }]
  }];

});
