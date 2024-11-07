<script setup lang="ts">
import Column from '@/components/Column.vue';
import { ref, onMounted } from 'vue'
import { getColumns } from "../services/columnService.js"
const columns = ref([])

const fetchColumns = () => {
  getColumns(9).then((res) => {
    columns.value = res
  }).catch(() => { })

}


onMounted(() => {
  fetchColumns()
})

</script>

<template>
  <div class="flex gap-4 overflow-x-auto p-4">
    <Column v-for="(column, index) in columns" :key="index" :data="column" />
  </div>
</template>
