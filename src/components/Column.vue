<script setup>
import Card from './Card.vue';
import { defineProps, ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue';
import { deleteColumn, editColumn } from '../services/columnService'
import { getCards } from '../services/cardServices.js'
import CardLoadingSkeleton from '../components/CardLoadingSkeleton.vue'

const props = defineProps({
    data: Object,
    refreshColumns: Function
})

const { id, title } = props.data || {};


const editTitle = ref(title || '')
const showEditTitle = ref(false)
const cards = ref([])
const cardsLoading = ref(false)



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

const fetchCards = async (id) => {
    cardsLoading.value = true
    getCards(id).then((res) => {
        cards.value = res
        cardsLoading.value = false
    }).catch(() => {
        cardsLoading.value = false
    })
}

onMounted(() => {
    fetchCards(id)
})

</script>

<template>
    <div class="flex flex-col bg-gray-100 rounded-lg p-4 min-w-[250px] mt-4">
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
        <div class="mt-4">
            <CardLoadingSkeleton v-if="cardsLoading" />
            <Card v-else v-for="(card, index) in cards" :key="'Card' + index" :data="card" />
        </div>
    </div>
</template>