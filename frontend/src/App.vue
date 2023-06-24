<template>
  <div class="w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500 border-4 border-zinc-300">
    <header class="w-full h-[5%] border-b-2">
      <nav class="w-full flex p-2 justify-evenly">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/chat-room">Chat Room</RouterLink>
        </nav>
    </header>
    <main class="w-full h-[95%]">
      <RouterView />
    </main>
  </div>
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>
