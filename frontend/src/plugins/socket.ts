import { reactive, onMounted, onUnmounted } from "vue";
import { io } from "socket.io-client";

export type SocketState = {
  connected: boolean,
  id: string,
  room: string,
  message: string[],
}

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

export default function useSocket() {

  const socketState: SocketState = reactive({
    connected: false,
    id: "",
    room: "",
    message: [],
  })

  const URL: string = "http://localhost:3000";

  const socket = io(URL, { autoConnect: false, });

  socket.on("connect", () => {
    socketState.connected = true;
    socketState.id = socket.id;
  });

  socket.on("disconnect", () => {
    socketState.connected = false;
    socketState.id = "";
    socketState.room = "";
  });

  socket.on("chat message", (data: Information) => {
    socketState.message.push(data.message);
  });

  socket.on("information", (data: Information) => {
    socketState.message.push(data.message);
  });

  onMounted(() => socket.connect());
  onUnmounted(() => socket.disconnect());

  return { socketState, socket };

}

