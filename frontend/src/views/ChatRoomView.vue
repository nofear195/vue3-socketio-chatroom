<template>
    <div>
        <ConnectionManager />
        <div>socket connect: {{ connected ? "yes" : "no" }}</div>
        <div v-if="message.length">
            <div v-for="msg in message" :key="msg">{{ msg }}</div>
        </div>
        <form action="">
            <input autocomplete="off" v-model.trim="text" />
            <button @click="send">Send</button>
        </form>
    </div>
</template>
<script setup lang="ts">
import { useSocketStore } from "@/stores/socketState";
import { storeToRefs } from "pinia";
import ConnectionManager from "@/components/ConnectionManager.vue";
const { connected, message } = storeToRefs(useSocketStore());
import { socket } from "@/plugins/socket";
import { ref } from 'vue'
import type { Ref } from 'vue'

const text: Ref<string> = ref("");

function send(e:Event):void{
    e.preventDefault();
    socket.emit("chat message",text.value);
    text.value = "";
}

</script>