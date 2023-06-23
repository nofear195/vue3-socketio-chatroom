<template>
    <div>
        <ConnectionManager />
        <div><button @click="join">join</button></div>
        <div>socket connect: {{ state.connected ? "yes" : "no" }}</div>
        <div v-if="state.message.length">
            <div v-for="msg in state.message" :key="msg">{{ msg }}</div>
        </div>
        <form action="">
            <input autocomplete="off" v-model.trim="text" />
            <button @click="send">Send</button>
        </form>
    </div>
</template>
<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import ConnectionManager from "@/components/ConnectionManager.vue";
import { socket,state } from "@/plugins/socket";

const text: Ref<string> = ref("");

function send(e:Event):void{
    e.preventDefault();
    socket.emit("chat message",state.id,state.room,text.value);
    text.value = "";
}

function join():void{
    console.log("state",state);
    socket.emit("join",state.id,state.room);
}

</script>