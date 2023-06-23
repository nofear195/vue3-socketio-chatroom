import { Server as SocketIOServer } from 'socket.io';

class Information {
    id: string;
    message: string;
    roomUsers: string[];
    constructor(id: string, message?: string, roomUsers?: string[]) {
        this.id = id;
        this.message = message ? message : "";
        this.roomUsers = roomUsers ? roomUsers : [];
    }
}

const roomEvent = (io: SocketIOServer, namespace: string = "/"): void => {

    const rooms: Map<string, Set<string>> = io.of(namespace).adapter.rooms;
    io.of(namespace).adapter.on("create-room", (room) => {
        console.log(`room ${room} was created`);
    });

    io.of(namespace).adapter.on("leave-room", (room, id) => {
        console.log(`socket ${id} has leaved room ${room}`);
        const info:Information = new Information(id,`${id} has leaved room ${room}`)
        io.in(room).emit("information", info);
    });

    io.on('connection', async (socket) => {
        console.log('user connect');
        console.log('sockets id', socket.id);

        socket.on("disconnect", msg => {
            console.log('user disconnect')
        })
        socket.on("join", (id: string, room: string) => {
            const info: Information = new Information(id);
            if (room === "") {
                info.message = "you are in a default room alone";
                io.to(id).emit("information", info);
                return;
            }
            if (rooms.get(room) === undefined) {
                socket.join(room);
                info.message = `you have created a new room named ${room}`;
                io.to(id).emit("information", info);
            }
            io.in(id).socketsJoin(room);
            info.message = `a new user has joined the room`;
            info.roomUsers = [...rooms.get(room)!]
            io.in(room).emit("information", info);

        })
        socket.on('chat message', (id: string, room: string, message: string) => {
            const info: Information = new Information(id, message);
            if (room === "" || rooms.get(room) === undefined) {
                io.to(id).emit("information", info);
            } else {
                io.in(room).emit("information", info);
            }
        });
    });
}

export default roomEvent;
