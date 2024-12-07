<script setup>
import { defineProps, ref } from 'vue'
import { addBoard } from '../../services/boardsServices.js'
import Modal from '../modal/Modal.vue'

const props = defineProps({ addCompleted: Function, user_id: Number })

const { addCompleted, user_id } = props

const visible = ref(true)

const onAddClick = () => {
    visible.value = true
    // addBoard({ user_id, title: 'THis is new' }).then(() => {
    //     addCompleted()
    // }).catch(() => { })


}

const onModalCancel = () => {
    visible.value = false
    console.log(visible.value)
}

const onModalConfirm = () => {
    visible.value = false

}




</script>

<template>
    <div class="flex justify-center items-center">
        <button @click="onAddClick" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded-full">
            Add Board
        </button>
        <Modal @cancel="onModalCancel" @confirm="onModalConfirm" :isVisible="visible" :key="visible" />
    </div>
</template>