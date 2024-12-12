<script setup>
import { defineProps, ref } from 'vue'
import { Icon } from '@iconify/vue';
import { deleteBoard, editBoard } from '../../services/boardsServices.js'
import router from '../../router'
import Modal from '../modal/Modal.vue';
import BoardForm from './BoardForm.vue';

const props = defineProps({ data: Object, refreshBoards: Function })

const { refreshBoards } = props || {}

const visible = ref(false)


const onDeleteClick = (e) => {
    e.stopPropagation()
    deleteBoard(props.data.id).then(() => {
        refreshBoards()
    }).catch(() => { })
}

const onEditClick = (e) => {
    e.stopPropagation()
    visible.value = true
}

const onCardClick = () => {
    router.push(`/board/${props.data.id}`)
}


const onModalCancel = () => {
    visible.value = false
}

const handleCreate = (title) => {
    editBoard(props.data.id, { title }).then(() => {
        refreshBoards()
        visible.value = false
    }).catch(() => { })
}



</script>

<template>
    <div>
        <div class="bg-white p-4 mb-4 rounded-lg shadow-md text-gray-800 flex justify-between hover:bg-blue-500 cursor-pointer hover:text-white"
            @click="onCardClick">
            <h3 class="font-semibold text-lg">{{ props.data.title }}</h3>
            <div>
                <button @click="onEditClick" class="hover:bg-gray-400 text-gray-800 font-bold px-2 rounded">
                    <Icon icon="material-symbols-light:edit-square-rounded" />
                </button>
                <button @click="onDeleteClick" class="hover:bg-gray-400 text-gray-800 font-bold px-2 rounded">
                    <Icon icon="material-symbols:delete-sharp" />
                </button>
            </div>
        </div>
        <Modal @cancel="onModalCancel" :isVisible="visible" :key="visible" title="Edit Board" :content="BoardForm">
            <template #content="{ onCancel }">
                <BoardForm :onCancel="onCancel" @onCreate="handleCreate" :title="props.data.title" />
            </template>
        </Modal>
    </div>
</template>