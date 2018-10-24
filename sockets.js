const socketio = require('socket.io');


exports.socketServer = (server) => {
    const io = socketio(server);

    io.on('connection', (socket) =>{
        console.log("Connection socket " + socket.id);
        socket.on('check-in', (data) => { 
                
                socket.broadcast.emit("add-to-present-members", data);
        });
    });
}