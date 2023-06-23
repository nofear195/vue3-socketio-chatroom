import { reactive } from "vue";
import { io } from "socket.io-client";

export const state: { connected: boolean, message: string[] } = reactive({
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
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on("chat message", (message: string) => {
  state.message.push(message);
});
