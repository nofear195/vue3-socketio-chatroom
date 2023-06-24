import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';

export const useRoomStore = defineStore('roomStore', () => {
  const rooms: string[] = reactive([])
  return { rooms };
})
