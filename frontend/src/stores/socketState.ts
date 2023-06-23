import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import {state} from "@/plugins/socket";
export const useSocketStore = defineStore('socketState', () => {
  const connected = computed(() => state.connected);
  const message = computed(() => state.message);

  return { connected,message }
})
