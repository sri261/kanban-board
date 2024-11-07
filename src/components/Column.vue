<script setup>
import Card from './Card.vue';
import { defineProps } from 'vue'

const props = defineProps({
    data: Object
})

const { title } = props.data || {};
</script>

<template>
    <div class="flex flex-col bg-gray-100 rounded-lg p-4 min-w-[250px]">
        <h2 class="font-bold text-xl text-gray-700 mb-4">{{ title }}</h2>
        <div>
            <Card />
        </div>
    </div>
</template>