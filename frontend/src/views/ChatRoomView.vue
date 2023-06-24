<template>
    <div class="p-4">
        <ChatWindow :room="room" />
    </div>
</template>
<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router';
import ChatWindow from '@/components/ChatWindow.vue';

const route = useRoute();
const room = computed<string>(() => route.query.room ? route.query.room?.toString() : '');

</script>