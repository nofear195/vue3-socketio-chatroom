<template>
  <div class="about">
    <h1>This is an about page</h1>
    <ConnectionManager />
    <div>socket connect: {{ connected ? "yes" : "no" }}</div>
    <div>{{ message }}</div>
  </div>
</template>

<script setup lang="ts">
import {useSocketStore} from "@/stores/socketState";
import { storeToRefs } from "pinia";
import ConnectionManager from "@/components/ConnectionManager.vue";
const {connected,message} = storeToRefs(useSocketStore());

</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
}
</style>
