import { Server as SocketIOServer } from 'socket.io';

type Message = {
    type: string;
    content: string;
}

class Information {
    id: string;
    message: Message;
    roomUsers: string[];
    constructor(id: string) {
        this.id = id;
        this.message = { type: '', content: '' };
        this.roomUsers = [];
    }
    setSystemMessage(content: string): void {
        this.message = { type: 'system', content };
    }
    setUserMessage(content: string): void {
        this.message = { type: 'user', content };
    }
}

const roomEvent = (io: SocketIOServer, namespace: string = "/"): void => {

    const rooms: Map<string, Set<string>> = io.of(namespace).adapter.rooms;
    io.of(namespace).adapter.on("create-room", (room) => {
        console.log(`room ${room} was created`);
    });

    io.of(namespace).adapter.on("leave-room", (room, id) => {
        console.log(`socket ${id} has leaved room ${room}`);
        const info: Information = new Information(id);
        info.setSystemMessage(`a user has leaved Room ${room}`)
        if (rooms.get(room)) info.roomUsers = [...rooms.get(room)]
        io.in(room).emit("information", info);
    });

    io.on('connection', async (socket) => {
        console.log('sockets id', socket.id, 'connect');

        socket.on("disconnect", msg => {
            console.log('user disconnect')
        })
        socket.on("join", (id: string, room: string) => {
            const info: Information = new Information(id);
            if (room === "") {
                info.setSystemMessage("you are in a default room alone");
                io.to(id).emit("information", info);
                return;
            }
            if (rooms.get(room) === undefined) {
                socket.join(room);
                info.setSystemMessage(`you have created a new room named ${room}`);
                io.to(id).emit("information", info);
            }
            io.in(id).socketsJoin(room);
            info.setSystemMessage(`a new user has joined the room`);
            if (rooms.get(room)) info.roomUsers = [...rooms.get(room)]
            io.in(room).emit("information", info);

        })
        socket.on('chat-message', (id: string, room: string, message: string) => {
            const info: Information = new Information(id);
            info.setUserMessage(message);
            if (rooms.get(room)) info.roomUsers = [...rooms.get(room)]
            if (room === "" || rooms.get(room) === undefined) {
                io.to(id).emit("information", info);
            } else {
                io.in(room).emit("information", info);
            }
        });
    });
}

export default roomEvent;
