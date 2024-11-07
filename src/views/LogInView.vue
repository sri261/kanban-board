<script setup>
import { ref } from 'vue';
import { login } from "../services/authService.js"

const email = ref('')
const password = ref('')

const onSubmit = () => {
    login({ email: email.value, password: password.value })
}
</script>



<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">

        <div class="container mx-auto p-6 max-w-md">

            <form @submit.prevent="onSubmit" class="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                <div class="font-semibold text-3xl text-gray-700">
                    Kanban
                </div>
                <div>
                    <label for="email" class="block text-base font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" name="email" id="email"
                        class="form-input block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        v-model="email" />
                </div>
                <div>
                    <label for="password" class="block text-base font-medium text-gray-700 mb-1">Password</label>
                    <input type="password" name="password" id="password"
                        class="form-input block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        v-model="password" />
                </div>
                <div>
                    <button type="submit"
                        class="w-full bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Log In
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>