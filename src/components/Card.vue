<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    data: Object
})

const { description, title, id } = props.data

</script>

<template>
    <div class="bg-white p-4 mb-4 rounded-lg shadow-md text-gray-800">
        <h3 class="font-semibold text-lg">{{ title }} </h3>
        <p class="text-sm text-gray-600">{{ description }}</p>
    </div>
</template>