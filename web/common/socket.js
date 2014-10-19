angular.module('socket', [])
.factory('socketFactory', function($q) {
    return {
        createInRoom : function(room) {
            var deferred = $q.defer();
            var socket = io.connect('http://localhost/');
            socket.emit('join room', room);
            socket.on('room joined', function() {
                deferred.resolve(socket);
            });
            socket.room = room;
            return deferred.promise;
        }
    };
})