(function () {
    'use strict';

    angular
        .module('meuApp.directive')
        .directive('onboard', Onboard);

    function Onboard($templateCache, $ionicModal, $sce) {
        return {
            restrict: 'E',
            controllerAs: 'vm',
            bindToController: true,
            template: '<div ng-transclude ng-if="vm.showContent"></div>',
            transclude: true,
            scope: {
                options: '=',
                onFinish: '&'
            },
            controller: function($scope, $element) {
                var vm = this;
                var template, modal;

                vm.slides = [];

                // hide directive element
                $element[0].style.display = 'none';

                var defaultOptions = {
                    onSlideChangeEnd: function() {
                        // update $scope on swipe
                        $scope.$evalAsync();
                    }
                };

                // merge default options
                vm.options = angular.merge({}, defaultOptions, vm.options);

                template = $templateCache.get('directives/onboard/onboard.html')
                modal = $ionicModal.fromTemplate(template, { scope: $scope });

                $scope.$on('$ionicSlides.sliderInitialized', function(event, data){
                    vm.slider = data.slider;
                });

                modal.show()
                // show modal content
                vm.showContent = true;

                vm.isSingleStep = function() {
                    return vm.slides.length === 1;
                };

                vm.addSlide = function(slide) {
                    vm.slides.push($sce.trustAsHtml(slide));
                };

                vm.nextStep = function() {
                    if (vm.slider.isEnd) {
                        vm.finishOnboard();
                        return;
                    }
                    vm.slider.slideNext();
                };

                vm.previousStep = function() {
                    vm.slider.slidePrev();
                };

                vm.finishOnboard = function() {
                    (vm.onFinish || angular.noop)();
                    modal.hide();
                };
            }
        };
    }
})();
