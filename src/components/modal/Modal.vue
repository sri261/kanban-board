<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({ isVisible: Boolean, header: Object, content: Object })
const emit = defineEmits(['cancel', 'confirm'])


const emitCancel = () => emit('cancel')
const emitConfirm = () => emit('confirm')

const { isVisible, header, content } = props

</script>

<template>
    <div v-if="isVisible">
        <div class="fixed inset-0 z-50 flex justify-center items-center">
            <div class="flex flex-col max-w-5xl rounded-lg shadow-lg bg-white">
                <div class="p-5">
                    <div class="flex justify-between items-start">
                        <component :is="header" />
                        <button class="p-1 leading-none" @click="emitCancel">
                            <div class="text-xl font-semibold h-6 w-6">
                                <span>x</span>
                            </div>
                        </button>
                    </div>
                </div>
                <slot v-if="content" name="content" :onCancel="emitCancel" :onConfirm="emitConfirm" />
                <div v-else class="p-6 flex justify-end items-center">
                    <button class="btn-outline" @click="emitCancel">Cancel</button>
                    <button class="btn ml-2" @click="emitConfirm">Confirm</button>
                </div>
            </div>
        </div>
        <div class="opacity-75 fixed inset-0 z-40 bg-black"></div>
    </div>
</template>