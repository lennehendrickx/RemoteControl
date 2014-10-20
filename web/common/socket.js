angular.module('socket', [])
.factory('socketFactory', function($q) {
    return {
        createInRoom : function(room) {
            var location = window.location;
            var url = location.protocol + '//' + location.hostname;
            var deferred = $q.defer();
            var socket = io.connect(url);
            socket.emit('join room', room);
            socket.on('room joined', function() {
                deferred.resolve(socket);
            });
            socket.room = room;
            return deferred.promise;
        }
    };
})