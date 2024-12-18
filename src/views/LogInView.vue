<script setup>
import { ref } from 'vue';
import { login } from "../services/authService.js"
import { z } from 'zod'
import { get } from 'lodash'


const fields = ref({ email: '', password: "", })
const errors = ref({})


const loginValidator = z.object({
    email: z.string().email().min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
})


const onSubmit = async () => {
    try {
        const validatedFields = loginValidator.parse(fields.value);
        await login(validatedFields)
        errors.value = {}
    } catch (err) {
        const mappedErrors = get(err, 'errors', []).reduce((acc, error) => {
            error.path.forEach(path => {
                acc[path] = error.message;
            });
            return acc;
        }, {});
        errors.value = mappedErrors
    }
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
                    <input type="text" name="email" id="email"
                        class="form-input block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        v-model="fields.email" />
                    <div v-if="errors.email" class="font-semibold text-sm text-red-500 mt-2">
                        {{ errors.email }}
                    </div>
                </div>
                <div>
                    <label for="password" class="block text-base font-medium text-gray-700 mb-1">Password</label>
                    <input type="password" name="password" id="password"
                        class="form-input block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        v-model="fields.password" />
                    <div v-if="errors.password" class="font-semibold text-sm text-red-500 mt-2">
                        {{ errors.password }}
                    </div>
                </div>
                <div>
                    <button type="submit"
                        class="w-full bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Log In
                    </button>
                </div>
            </form>
            <div class="flex justify-center mt-4">
                <a href="/signup" class="text-blue-500 hover:text-blue-700 ">
                    Create an Account.
                </a>
            </div>
        </div>
    </div>
</template>