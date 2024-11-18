<script setup>
import { ref, defineProps } from 'vue'
import { addColumn } from '../services/columnService'

const props = defineProps({
    refreshColumns: Function
})


const showAddColumnForm = ref(false)

const title = ref('')


const onButtonClick = () => {
    showAddColumnForm.value = !showAddColumnForm.value
}

const onAddClick = () => {
    addColumn({ board_id: 9, title: title.value, position: 9 }).then(() => {
        props.refreshColumns()
        title.value = ''
        showAddColumnForm.value = false
    })
}

const onCancel = () => {
    showAddColumnForm.value = false
}
</script>
<template>



    <div class="flex flex-col  mt-4 min-w-[250px]">


        <button @click="onButtonClick" v-if="!showAddColumnForm"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center justify-center">
            <span>Add List</span>
        </button>
        <div v-if="showAddColumnForm">
            <input type="title" name="title" id="title"
                class="form-input block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                v-model="title" />
        </div>
        <div v-if="showAddColumnForm">
            <button @click="onAddClick"
                class="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Add
            </button>
            <button @click="onCancel"
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                X
            </button>
        </div>
    </div>
</template>