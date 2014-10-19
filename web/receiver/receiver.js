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
});