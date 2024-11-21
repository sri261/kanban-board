<script setup>
import Column from '@/components/Column.vue';
import AddColumn from '../components/AddColumn.vue'
import { ref, onMounted, watch } from 'vue'
import { getColumns } from "../services/columnService.js"
import { token } from '../api/api.js'
import ColumnLoadingSkeleton from '../components/ColumnLoadingSkeleton.vue'

const columns = ref([])
const loading = ref(true)

const fetchColumns = () => {
  getColumns(9).then((res) => {
    loading.value = false
    columns.value = res
  }).catch(() => {
    loading.value = false
  })

}

onMounted(() => {
  fetchColumns()
})

watch(token, () => {
  fetchColumns()
})

</script>

<template>
  <div class="flex gap-4 overflow-x-auto p-4">
    <ColumnLoadingSkeleton v-if="loading" v-for="index in 4" :key="index" />
    <Column v-else v-for="(column, index) in columns" :key="'column-' + index" :data="column"
      :refreshColumns="fetchColumns" />
    <AddColumn :refreshColumns="fetchColumns" />
  </div>
</template>
