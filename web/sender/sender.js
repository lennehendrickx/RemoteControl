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
            $scope.room = socket.room;

            var orientationStream = Rx.DOM.fromEvent(window, 'deviceorientation')
                         .map(function(orientationEvent) {
                            return  {
                                alpha: orientationEvent.alpha,
                                beta: orientationEvent.beta,
                                gamma: orientationEvent.gamma
                            };
                         })
                         .sample(200)
                         .distinctUntilChanged();

            var subscription = orientationStream.subscribe(function(orientation) {
                $scope.$apply(function() {
                    $scope.orientation = orientation;
                });

                socket.emit('orientation', {
                    room : socket.room,
                    orientation: orientation
                });
            })

            $scope.$on('$destroy', function() {
                subscription.dispose();
            });

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