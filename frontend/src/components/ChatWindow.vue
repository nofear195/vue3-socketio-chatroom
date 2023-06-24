<template>
    <div class="box-border w-[50%] h-[50%] flex flex-col rounded-lg border-4">
        <div class="w-full h-[5vh] bg-black px-3 flex justify-evenly items-center text-white rounded-t-md">
            <button class="w-12 h-6 rounded-full bg-slate-300" @click="join">Join</button>
            <div class="h-6">Room - {{ socketState.room }}</div>
            <div class="h-6">{{ socketState.connected ? 'connected' : 'disconnect' }}</div>
            <button class="w-6 h-6 rounded-full bg-rose-500 text-center flex justify-center items-center"
                @click="socket.disconnect()">X</button>
        </div>
        <div class="w-full h-[30vw] bg-gray-700 rounded-b-md px-2 py-1">
            <div class="w-full h-[10%] bg-gray-300 flex items-center px-2">
                Text Information
            </div>
            <div class="w-full h-[80%] bg-slate-50 p-2 overflow-auto grid grid-cols-1 divide-y-2">
                <div v-for="msg in socketState.message" :key="msg" class="h-10 flex items-center w-full">
                    {{ msg }}
                </div>
            </div>
            <div class="w-full h-[10%] flex items-center justify-around text-white">
                <input class="w-[85%] block bg-gray-500  px-2" v-model.trim="text" autocomplete="off" />
                <button class="w-[10%] h-7 rounded-full border-2 flex justify-center items-center"
                    @click="send">Send</button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import useSocket from "@/plugins/socket";

const props = defineProps<{
    room: string,
}>();


const { socketState, socket } = useSocket();
const text: Ref<string> = ref("");

function send(e: Event): void {
    e.preventDefault();
    if (text.value === "") return;
    socket.emit("chat message", socketState.id, socketState.room, text.value);
    text.value = "";
}

function join(): void {
    socketState.room = props.room;
    socket.emit("join", socketState.id, socketState.room);
}


</script>