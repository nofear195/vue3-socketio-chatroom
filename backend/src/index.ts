import express,{type Express} from 'express';
import { createServer,Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import roomEvent from './roomEvent';

const app: Express = express();
const httpServer: HttpServer = createServer(app);
const io: SocketIOServer = new SocketIOServer(httpServer, {
    cors: {
        origin: "*",
    }
});

const port = 3000;

roomEvent(io);

httpServer.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});