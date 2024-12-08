<script setup>
import { defineProps } from 'vue'
import { Icon } from '@iconify/vue';
import { deleteBoard } from '../../services/boardsServices.js'
import router from '../../router'

const props = defineProps({ data: Object, deleteCompleted: Function })

const { data: { title, id }, deleteCompleted } = props || {}

const onDeleteClick = () => {
    deleteBoard(id).then(() => {
        deleteCompleted()
    }).catch(() => { })
}

const onCardClick = () => {
    router.push(`/board/${id}`)
}

</script>

<template>
    <div class="bg-white p-4 mb-4 rounded-lg shadow-md text-gray-800 flex justify-between hover:bg-blue-500 cursor-pointer hover:text-white"
        @click="onCardClick">
        <h3 class="font-semibold text-lg">{{ title }}</h3>
        <button @click="onDeleteClick" class="hover:bg-gray-400 text-gray-800 font-bold px-2 rounded">
            <Icon icon="material-symbols:delete-sharp" />
        </button>
    </div>
</template>