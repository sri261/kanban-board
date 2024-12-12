<script setup>
import { defineProps, defineEmits, ref } from 'vue'


const props = defineProps({
    onCancel: Function,
    title: String
})
const emit = defineEmits(['onCreate'])

const { onCancel } = props

const title = ref(props.title || '')

const onSubmit = () => {
    emit('onCreate', title.value)
}


</script>
<template>
    <div>
        <form @submit.prevent="onSubmit" class="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-md w-full">
            <div>
                <label for="title" class="block text-base font-medium text-gray-700 mb-1">Title</label>
                <input type='text' name="title" id="title"
                    class="form-input block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    v-model="title" />
            </div>
            <div class="p-6 flex justify-end items-center">
                <button class="btn-outline" @click="onCancel">Cancel</button>
                <button type="submit" class="btn ml-2">Create</button>
            </div>
        </form>

    </div>
</template>