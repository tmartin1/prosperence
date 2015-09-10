(function () {
  'use strict';

  angular.module('prosperenceApp.dashboard.sidebar', [])
  .controller('DashboardSidebarCtrl', function ($state, DashboardService) {
    var vm = this;
    vm.$state = $state;

    // Sidebar information.
    vm.sidebar = [{
      title: 'Overview',
      link: 'dashboard.overview',
      icon: '',
      dropdown: [
        { text: 'Organize Items', func: angular.noop }, // Allow user to drag & drop overview planels to customize order.
        { text: 'Reset to Default', func: vm.resetDefaultOverviewPlanels } // Reset overview planels to defaults.
      ]
    }, {
      title: 'My Plan',
      link: 'dashboard.my-plan',
      icon: '',
      setView: 'myPlanView',
      submenu: [{
        title: 'Net Worth',
        view: 'dashboard.my-plan.net-worth',
        active: true
      }, {
        title: 'Budget',
        view: 'dashboard.my-plan.budget'
      }, {
        title: 'Insurance',
        view: 'dashboard.my-plan.insurance'
      }, {
        title: 'Retirement',
        view: 'dashboard.my-plan.retirement'
      }, {
        title: 'Add More',
        view: 'dashboard.my-plan.more'
      }]
    }, {
      title: 'Progress',
      link: 'dashboard.progress',
      icon: ''
    }, {
      // TODO: This, tutorial favorite system.
      title: 'My University',
      link: 'dashboard.university',
      icon: ''
    }, {
      title: 'Settings',
      link: 'dashboard.settings',
      icon: 'glyphicon glyphicon-cog',
      setView: 'settingsView',
      submenu: [{
        title: 'Basic',
        view: 'settings/basic/basic.html',
        active: true
      }, {
        title: 'Notifications',
        view: 'settings/notifications/notifications.html'
      }, {
        title: 'Security',
        view: 'settings/security/security.html'
      }]
    }];

    // Check and set submenu viewability on load/state enter.
    for (var i=0; i<vm.sidebar.length; i++) {
      if ($state.current.name === vm.sidebar[i].link && vm.sidebar[i].submenu) {
        vm.sidebar[i].submenu.visible = true;
      }
    }

    // Dropdown menu toggle
    $('.dropdown').click(function () {
      $('.dropdown-toggle').dropdown('toggle');
    });

  });

})();
