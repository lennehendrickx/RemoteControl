angular.module('sender', ['socket', 'ngRoute'])
.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '/sender/connect/connect.html',
        resolve: {
            socket : function(socketFactory, idFactory) {
                return socketFactory.createInRoom(idFactory.create());
            }
        },
        controller : function($scope, socket) {
            if (window.DeviceOrientationEvent) {
                // gamma is the left-to-right tilt in degrees, where right is positive
                // beta is the front-to-back tilt in degrees, where front is positive
                // alpha is the compass direction the device is facing in degrees
                window.addEventListener('deviceorientation', sendOrientation, false);
            } else{
                alert('Device orientation not supported in this browser.');
            }

            $scope.room = socket.room;
            function sendOrientation(orientationEvent) {
                var orientation = {
                    alpha: orientationEvent.alpha,
                    beta: orientationEvent.beta,
                    gamma: orientationEvent.gamma
                }
                $scope.orientation = orientation;
                socket.emit('orientation', {
                    room : socket.room,
                    orientation: orientation
                });
            }
        }
    }).otherwise('/')
})
.factory('idFactory', function() {
   return {
       create: function() {
            return '1234';
       }
   }
})
;