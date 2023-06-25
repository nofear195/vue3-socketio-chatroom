import { reactive, onMounted, onUnmounted } from "vue";
import { io } from "socket.io-client";

type Message = {
  type: string;
  content: string;
}

type Information = {
  id: string;
  message: Message;
  roomUsers: string[];
}

export type SocketState = {
  connected: boolean,
  id: string,
  room: string,
  message: Message[],
  users:string[],
}

export default function useSocket(url: string, room?: string) {

  const socketState: SocketState = reactive({
    connected: false,
    id: "",
    room: room ? room : "",
    message: [],
    users: [],
  })

  const socket = io(url, { autoConnect: false, });

  socket.on("connect", () => {
    socketState.connected = true;
    socketState.id = socket.id;
  });

  socket.on("disconnect", () => {
    socketState.connected = false;
    socketState.id = "";
    socketState.room = "";
  });

  socket.on("information", (data: Information) => {
    const message: Message = data.message;
    if(message.type !== 'system'){
      message.type = data.id === socketState.id ? 'source' : 'destination';
    }
    socketState.message.push(message);
    socketState.users = data.roomUsers;
  });

  onMounted(() => socket.connect());
  onUnmounted(() => socket.disconnect());

  return { socketState, socket };

}

