<template>
    <div class="box-border flex justify-around flex-col p-2 rounded-lg border-4 bg-black text-white">
        <div class="h-[10%] flex justify-around items-center">
            <div class="w-[60%] text-lg truncate">Room - {{ socketState.room }}</div>
            <div class="w-[20%] text-center">{{ socketState.connected ? 'connected' : 'disconnect' }}</div>
            <div class="w-[10%] text-center"> ( {{ socketState.users.length }} )</div>
            <button class="w-6 h-6 rounded-full bg-rose-500 text-center flex-box-center" @click="close">X</button>
        </div>
        <div ref="content"
            class="h-[75%] grid grid-cols-1 auto-rows-max divide-y-2 rounded-md bg-slate-50 p-2 overflow-y-scroll">
            <template v-for="message in socketState.message" :key="message">
                <div v-if="message.type === 'system'" class="h-10 flex items-center justify-center text-gray-500">
                    {{ message.content }}
                </div>
                <div v-else-if="message.type === 'source'" class="h-10 flex items-center justify-end text-lime-500">
                    {{ message.content }}
                </div>
                <div v-else class="h-10 flex items-center justify-start text-purple-400">
                    {{ message.content }}
                </div>
            </template>
        </div>
        <div class="h-[10%] pt-1 flex items-center justify-around text-white">
            <input class="w-[85%] block bg-gray-500  px-2 rounded-full" v-model.trim="text" autocomplete="off" />
            <button class="w-[10%] h-7 rounded-full border-2 flex-box-center" @click="send">Send</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { Ref } from 'vue'
import { computed, watch, ref } from 'vue'
import useSocket from "@/plugins/socket";

const props = defineProps<{
    url: string,
    room: string,
}>();

const emits = defineEmits<{
    (e: 'close', room: string): void,
}>();

const { socketState, socket } = useSocket(props.url, props.room);
const text: Ref<string> = ref("");
const content: Ref<Element | null> = ref(null);

const isConnected = computed<boolean>(() => socketState.connected)
watch(isConnected, (curent: boolean) => {
    if (curent) socket.emit("join", socketState.id, socketState.room);
});


function send(e: Event): void {
    e.preventDefault();
    if (text.value === "") return;
    socket.emit("chat-message", socketState.id, socketState.room, text.value);

    if (content.value) content.value.scrollTop = content.value.scrollHeight;
    text.value = "";
};

function close(): void {
    socket.disconnect();
    emits('close', props.room);
}

</script>