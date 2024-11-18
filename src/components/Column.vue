<script setup>
import Card from './Card.vue';
import { defineProps } from 'vue'
import { Icon } from '@iconify/vue';
import { deleteColumn } from '../services/columnService'

const props = defineProps({
    data: Object,
    refreshColumns: Function
})

const { id, title } = props.data || {};


const onDeleteClick = () => {
    deleteColumn(id).then(() => { props.refreshColumns() })
}

</script>

<template>
    <div class="flex flex-col bg-gray-100 rounded-lg p-4 min-w-[250px] mt-4">
        <div class="flex justify-between">
            <h2 class="font-bold text-xl text-gray-700 mb-4">{{ title }}</h2>
            <button
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                <Icon icon="material-symbols:delete-sharp" @click="onDeleteClick" />
            </button>
        </div>
        <div>
            <Card />
        </div>
    </div>
</template>