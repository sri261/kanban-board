<script setup>
import { onMounted, ref } from 'vue'
import { getBoards } from '../services/boardsServices'
import BoardCard from '../components/BoardCard.vue'

const boards = ref([])

const fetchBoards = () => {
    getBoards(15).then((res) => {
        boards.value = res
    }).catch((error) => {
    })
}

onMounted(() => {
    fetchBoards()
})

</script>
<template>
    <div class="container mx-auto p-16">
        <h2 class="text-2xl/7 font-bold mb-8">Boards</h2>
        <div class="grid gap-4 grid-cols-3">
            <BoardCard v-for="board in boards" :key="board.id" :data="board" :delete-completed="fetchBoards" />
        </div>
    </div>
</template>
