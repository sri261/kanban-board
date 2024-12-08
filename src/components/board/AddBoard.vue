<script setup>
import { defineProps, ref } from 'vue'
import { addBoard } from '../../services/boardsServices.js'
import Modal from '../modal/Modal.vue'
import AddBoardModalHeader from './AddBoardModalHeader.vue';
import AddBoardModalContent from './AddBoardModalContent.vue';
const props = defineProps({ addCompleted: Function, user_id: Number })

const { addCompleted, user_id } = props

const visible = ref(true)

const onAddClick = () => {
    visible.value = true


}

const onModalCancel = () => {
    visible.value = false
}

const handleCreate = (title) => {
    addBoard({ user_id, title }).then(() => {
        addCompleted()
        visible.value = false
    }).catch(() => {
        visible.value = false
    })
}




</script>

<template>
    <div class="flex justify-center items-center">
        <button @click="onAddClick" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded-full">
            Add Board
        </button>
        <Modal @cancel="onModalCancel" :isVisible="visible" :key="visible" :header="AddBoardModalHeader"
            :content="AddBoardModalContent">
            <template #content="{ onCancel }">
                <AddBoardModalContent :onCancel="onCancel" @onCreate="handleCreate" />
            </template>
        </Modal>
    </div>
</template>