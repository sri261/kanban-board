<script setup>
import { onMounted, ref, } from 'vue'
import { getBoards } from '../services/boardsServices.js'
import BoardCard from '../components/board/BoardCard.vue'
import AddBoard from '../components/board/AddBoard.vue'
const boards = ref([])

const user_id = 15

const fetchBoards = () => {
    getBoards(user_id).then((res) => {
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
            <BoardCard v-for="board in boards" :key="board.id" :data="board" :refreshBoards="fetchBoards" />
            <AddBoard :addCompleted="fetchBoards" :user_id="user_id" />
        </div>
    </div>
</template>
