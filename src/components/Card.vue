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
const onEditClick = (e) => {
    e.stopPropagation()
    emits('onEdit', props.data)
}

</script>

<template>
    <div class="bg-white p-4 mb-4 rounded-lg shadow-md text-gray-800">
        <div class="flex justify-between">
            <h3 class="font-semibold text-lg">{{ title }} </h3>
            <div>
                <button @click="onEditClick" class="hover:bg-gray-400 text-gray-800 font-bold px-2 rounded">
                    <Icon icon="material-symbols-light:edit-square-rounded" />
                </button>
                <button @click="onDeleteClick" class="hover:bg-gray-400 text-gray-800 font-bold px-2 rounded">
                    <Icon icon="material-symbols:delete-sharp" />
                </button>
            </div>
        </div>
        <p class="text-sm text-gray-600">{{ description }}</p>
    </div>
</template>