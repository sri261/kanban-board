<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({ isVisible: Boolean })
const emit = defineEmits(['cancel', 'confirm'])


const emitCancel = () => emit('cancel')
const emitConfirm = () => emit('confirm')

const { isVisible } = props

</script>

<template>
    <div v-if="isVisible">
        <div class="fixed inset-0 z-50 flex justify-center items-center">
            <div class="flex flex-col max-w-5xl rounded-lg shadow-lg bg-white">
                <!-- header -->
                <div class="p-5">
                    <div class="flex justify-between items-start">
                        <h3 class="text-2xl font-semibold">Modal Header</h3>
                        <button class="p-1 leading-none" @click="emitCancel">
                            <div class="text-xl font-semibold h-6 w-6">
                                <span>x</span>
                            </div>
                        </button>
                    </div>
                </div>
                <!-- body -->
                <div class="p-6">
                    <p>
                        This is a modal body content. Let's make this line a bit longer to see the width.
                    </p>
                </div>
                <!-- footer -->
                <div class="p-6 flex justify-end items-center">
                    <button class="btn-outline" @click="emitCancel">Cancel</button>
                    <button class="btn ml-2" @click="emitConfirm">Confirm</button>
                </div>
            </div>
        </div>
        <div class="opacity-75 fixed inset-0 z-40 bg-black"></div>
    </div>
</template>