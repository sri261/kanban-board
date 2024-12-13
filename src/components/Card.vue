<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
import { defineProps, defineEmits } from 'vue'

const emits = defineEmits(['onDelete'])

const props = defineProps({
    data: Object
})

const { description, title, id } = props.data

const onDeleteClick = (e) => {
    e.stopPropagation()
    emits('onDelete', id)
}

</script>

<template>
    <div class="bg-white p-4 mb-4 rounded-lg shadow-md text-gray-800">
        <div class="flex justify-between">
            <h3 class="font-semibold text-lg">{{ title }} </h3>
            <button @click="onDeleteClick" class="hover:bg-gray-400 text-gray-800 font-bold px-2 rounded">
                <Icon icon="material-symbols:delete-sharp" />
            </button>
        </div>
        <p class="text-sm text-gray-600">{{ description }}</p>
    </div>
</template>