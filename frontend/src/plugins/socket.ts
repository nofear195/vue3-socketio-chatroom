import { reactive } from "vue";
import { io } from "socket.io-client";

export const state: { id: string, room:string, connected: boolean, message: string[] } = reactive({
  id: "",
  room:"default",
  connected: false,
  message: [],
});

// "undefined" means the URL will be computed from the `window.location` object
const URL: string = "http://localhost:3000";

export const socket = io(
  URL,
  {
    autoConnect: false,
  }
);

socket.on("connect", () => {
  state.id = socket.id;
  state.connected = true;
});

socket.on("disconnect", () => {
  state.id = "";
  state.room = ""
  state.connected = false;
});

socket.on("chat message", (message: string) => {
  state.message.push(message);
});

socket.on("information", (message: string) => {
  state.message.push(message);
});