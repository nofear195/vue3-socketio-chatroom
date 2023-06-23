import { Server as SocketIOServer } from 'socket.io';

const roomEvent = (io: SocketIOServer) => {
    io.on('connection', (socket) => {
        console.log('user connect');
        socket.on("disconnect", msg => {
            console.log('user disconnect')
        })
        socket.on('chat message', msg => {
            io.emit('chat message', msg);
        });
    });
}

export default roomEvent;
