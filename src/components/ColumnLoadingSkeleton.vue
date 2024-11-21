<script setup>

</script>
<template>
    <div class="flex flex-col bg-gray-100 rounded-lg p-4 min-w-[250px] mt-4 animate-pulse w-64 p-4 space-y-4">
        <div class="h-6 bg-gray-300 rounded w-3/4"></div>
        <div v-for="index in 5" :key="index" class="h-4 bg-gray-300 rounded w-full"></div>
    </div>
</template>