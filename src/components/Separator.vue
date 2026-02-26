<template>
    <div class="jub-separator d-flex" :style="{ height: props.size + 'px', width: '100%' }">
        <div class="flex-grow-1 bg-blue-darken-1"></div>
        <div class="flex-grow-1 bg-blue-accent-4"></div>
        <div class="flex-grow-1 bg-blue-darken-4"></div>
        <div class="flex-grow-1 bg-blue-accent-3"></div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    size: number;
}>();
</script>