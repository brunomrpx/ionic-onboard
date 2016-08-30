(function () {
    'use strict';

    angular
        .module('meuApp.directive')
        .directive('onboardSlide', OnboardSlide);

    function OnboardSlide() {
        return {
            restrict: 'E',
            transclude: true,
            template: '<ng-transclude></ng-transclude>',
            require: '^onboard',
            scope: {},
            link: function(scope, element, attrs, controller) {
                scope.slide = element.children('ng-transclude').html();
                controller.addSlide(scope.slide);
            }
        };
    }
})();
