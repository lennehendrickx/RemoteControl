/* global require,console,__dirname */

(function() {
    "use strict";
    var serveStatic = require('serve-static');
    var app = require('express')();
    var server = require('http').Server(app);
    var io = require('socket.io')(server);

    server.listen(80);

    app.use(serveStatic(__dirname + '/../web'));

    io.on('connection', function (socket) {
        socket.on('join room', function (room) {
            console.log(room);
            socket.join(room);
            socket.emit('room joined');
        });

        socket.on('orientation', function (data) {
            console.log(data.orientation);
            socket.broadcast.to(data.room).emit('orientation', data.orientation);
        });
    });
})();