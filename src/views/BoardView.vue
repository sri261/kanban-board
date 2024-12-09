<script setup>
import Column from '@/components/Column.vue';
import AddColumn from '../components/AddColumn.vue'
import { ref, onMounted } from 'vue'
import { getColumns } from "../services/columnService.js"
import ColumnLoadingSkeleton from '../components/ColumnLoadingSkeleton.vue'
import { useRoute } from 'vue-router'

const columns = ref([])
const loading = ref(true)

const route = useRoute()

const board_id = route.params.id

const fetchColumns = () => {
  getColumns(board_id).then((res) => {
    loading.value = false
    columns.value = res
  }).catch(() => {
    loading.value = false
  })

}

onMounted(() => {
  fetchColumns()
})


</script>

<template>
  <h2 class="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight p-4">Title</h2>
  <div class="flex gap-4 overflow-x-auto p-4">
    <ColumnLoadingSkeleton v-if="loading" v-for="index in 4" :key="index" />
    <Column v-else v-for="(column, index) in columns" :key="'column-' + index" :data="column"
      :refreshColumns="fetchColumns" />
    <AddColumn :refreshColumns="fetchColumns" :board_id="board_id" />
  </div>
</template>
