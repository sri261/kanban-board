<script setup>
import { logout } from "../../services/authService.js"
import router from "../../router"

const onLogout = () => {
    logout()
} 
</script>

<template>
    <nav class="flex justify-between items-center p-8 border-b-4 shadow-lg fixed top-0 left-0 right-0 bg-white z-50">

        <div>LOGO</div>
        <div>
            <button @click="onLogout"
                class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                Logout
            </button>
        </div>
    </nav>
</template>