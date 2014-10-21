angular.module('receiver', ['socket', 'ngRoute'])
.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '/receiver/display/display.html',
        controller : function($scope, socketFactory) {
            $scope.connect = function(room) {
                var socket = socketFactory.createInRoom(room)
                    .then(function(socket) {
                        socket.on('orientation', function(orientation) {
                            $scope.$apply(function() {
                                $scope.orientation = orientation;
                            });
                        })
                    });
            };

            $scope.connect('1234');
        }
    }).otherwise('/')
})
.directive('orientation', function() {
    return {
        scope : {
            orientation : '='
        },
        link : function(scope, element, attrs) {
            scope.$watch('orientation', function(orientation) {
                if(!orientation) return;

                element.css('-webkit-transform', 'rotate(' + orientation.gamma + 'deg) rotate3d(1,0,0, ' + (orientation.beta * -1) + 'deg)');
                element.css('-moz-transform', 'rotate(' + orientation.gamma + 'deg)');
                element.css('transform', 'rotate(' + orientation.gamma + 'deg) rotate3d(1,0,0, ' + (orientation.beta * -1) + 'deg)');
            });
        }
    }
});