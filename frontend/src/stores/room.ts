import { ref, reactive } from 'vue';
import type { Ref } from 'vue';
import { defineStore } from 'pinia';

export const useRoomStore = defineStore('roomStore', () => {
  const url: Ref<string> = ref('ws://localhost:3000?token=auth_token');
  const rooms: Set<string> = reactive(new Set<string>());
  return { rooms, url };
})
