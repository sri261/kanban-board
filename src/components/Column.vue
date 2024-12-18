<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue';
import { deleteColumn, editColumn } from '../services/columnService'
import CardLoadingSkeleton from '../components/CardLoadingSkeleton.vue'
import Modal from './modal/Modal.vue';
import CardForm from './CardForm.vue';
import { createCard, deleteCard, editCard } from '@/services/cardServices';
import { useDragAndDrop } from "@formkit/drag-and-drop/vue";

const props = defineProps({
    data: Object,
    refreshColumns: Function
})

const { id, title, cards } = props.data || {};


const editTitle = ref(title || '')
const showEditTitle = ref(false)
const cardsLoading = ref(false)
const visible = ref(false)
const isCardEditing = ref(false)
const cardValues = ref(null)



const onDeleteClick = () => {
    deleteColumn(id).then(() => { props.refreshColumns() })
}

const onTitleClick = () => {
    showEditTitle.value = true
}

const onBlur = () => {
    showEditTitle.value = false
    editColumn(editTitle.value, id).then(() => {
        props.refreshColumns()
    })

}


const onModalCancel = () => {
    visible.value = false
    isCardEditing.value = false
    cardValues.value = null
}

const handleCreate = async (values) => {
    try {
        isCardEditing.value ? await editCard(values.id, values) : await createCard({ ...values, position: 20, column_id: id })
        props.refreshColumns()
        onModalCancel()
    } catch (error) {

    }
}


const onAddClick = () => visible.value = true

const onCardDelete = (card_id) => {
    deleteCard(card_id).then(() => {
        props.refreshColumns()
    }).catch(() => { })
}

const onCardEdit = (data) => {
    isCardEditing.value = true
    visible.value = true
    cardValues.value = data
}

const [parent, draggableCards] = useDragAndDrop(cards);

</script>

<template>
    <div class="flex flex-col bg-gray-100 rounded-lg p-4 min-w-[250px] w-[250px] mt-4">
        <div class="flex justify-between content-between">
            <input v-if="showEditTitle" type="text"
                class="form-input block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                v-model="editTitle" @blur="onBlur" />
            <h2 v-else="!showEditTitle" class="font-bold text-xl text-gray-700" @click="onTitleClick">{{ title }}
            </h2>
            <button @click="onDeleteClick"
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-2 rounded inline-flex items-center">
                <Icon icon="material-symbols:delete-sharp" />
            </button>
        </div>
        <div>
            <div class="mt-4" ref="parent">
                <CardLoadingSkeleton v-if="cardsLoading" />

                <!----------------- Card ------------------->
                <div v-else v-for="(card, index) in draggableCards" :key="'Card' + index"
                    class="bg-white p-4 mb-4 rounded-lg shadow-md text-gray-800">
                    <div class="flex justify-between">
                        <h3 class="font-semibold text-lg">{{ card.title }} </h3>
                        <div>
                            <button @click="onCardEdit" class="hover:bg-gray-400 text-gray-800 font-bold px-2 rounded">
                                <Icon icon="material-symbols-light:edit-square-rounded" />
                            </button>
                            <button @click="onCardDelete"
                                class="hover:bg-gray-400 text-gray-800 font-bold px-2 rounded">
                                <Icon icon="material-symbols:delete-sharp" />
                            </button>
                        </div>
                    </div>
                    <p class="text-sm text-gray-600">{{ card.description }}</p>
                </div>
                <!------------------------------------>
            </div>
            <div class="flex justify-center">
                <button @click="onAddClick"
                    class="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-10 rounded">
                    Add Task
                </button>
            </div>
        </div>

    </div>

    <Modal @cancel="onModalCancel" :isVisible="visible" :key="visible"
        :title="isCardEditing ? 'Edit Task' : 'Create Task'" :content="CardForm">
        <template #content="{ onCancel }">
            <CardForm :onCancel="onCancel" @onCreate="handleCreate" :values="cardValues" />
        </template>
    </Modal>
</template>