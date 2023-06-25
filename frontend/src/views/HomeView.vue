<template>
  <div class="w-full h-full flex flex-col p-10">
    <div class="h-[8%] border rounded-full  flex items-center mb-10 text-white">
      <input type="text" class="w-[85%] block h-full rounded-l-full bg-transparent  placeholder:text-white px-4"
        v-model="inputText" placeholder="join chat room" />
      <button class="w-[15%] h-full rounded-r-full flex justify-center items-center bg-sky-400" @click="joinChat">
        Join</button>
    </div>
    <div class="h-[90%] border rounded-md">
      <div class="h-[10%] border-b-2 text-white text-2xl px-4 flex items-center">Recent</div>
      <div class="max-h-[90%] p-2 rounded-b-md overflow-auto grid grid-cols-1 divide-y-2">
        <div v-for="room in rooms" :key="room" class="h-10 flex items-center w-full px-2" @click="inputText = room">
          Room ID : {{ room }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { type Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRoomStore } from '@/stores/room';

const router = useRouter();
const { rooms } = useRoomStore();

const inputText: Ref<string> = ref("");

function joinChat(): void {
  if (inputText.value === "") return;
  rooms.add(inputText.value);
  router.push({
    name: 'chat-room',
    query: { room: inputText.value }
  })
}
</script>
