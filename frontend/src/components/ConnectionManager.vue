<template>
    <button @click="connect()">Connect</button>
    <button @click="disconnect()">Disconnect</button>
</template>
  
<script setup lang="ts">
import { socket } from "@/plugins/socket";
import { onUnmounted } from "vue";

function connect(): void {
    socket.connect();
}
function disconnect(): void {
    socket.disconnect();
}

onUnmounted(()=> disconnect());

</script>