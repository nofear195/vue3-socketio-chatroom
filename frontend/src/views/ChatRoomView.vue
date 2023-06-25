<template>
    <div class="h-full p-4 grid grid-cols-2 auto-rows-max gap-4 overflow-auto">
        <ChatWindow class="h-[20vw]" v-for="room in rooms" :key="room" :url="url" :room="room" @close="closeRoom" />
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router';
import ChatWindow from '@/components/ChatWindow.vue';
import { useRoomStore } from '@/stores/room';

const route = useRoute();
const { url, rooms } = useRoomStore();
onMounted(() => {
    if (route.query.room) rooms.add(route.query.room?.toString());
})




function closeRoom(room: string) {
    rooms.delete(room);
}

</script>