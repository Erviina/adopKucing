<template>
  <div class="min-h-screen flex items-center justify-center bg-[#f7f1e8] relative mt-10">
    <!-- Login Card -->
    <div
      class="relative bg-[#FCD34D] rounded-2xl shadow-lg w-[340px] sm:w-[400px] p-8 flex flex-col items-center"
    >
      <!-- Cat Image -->
      <img
        src="images/Asset Login/kucing-oren.png"
        alt="Cat"
        class="absolute right-[45%] -top-30  h-50 object-contain"
      />

      <!-- Title -->
      <h2 class="mt-12 text-2xl font-bold text-gray-900 text-center">WELCOME BACK</h2>
      <p class="text-gray-800 mt-2 text-sm">Log in your account</p>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="mt-6 w-full flex flex-col space-y-4">
        <input
          v-model="username"
          type="text"
          placeholder="Enter your username"
          class="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-800 focus:ring-2 focus:ring-yellow-400 focus:outline-none placeholder-gray-500"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Enter your password"
          class="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-800 focus:ring-2 focus:ring-yellow-400 focus:outline-none placeholder-gray-500"
          required
        />
        <button
          type="submit"
          class="w-full py-2 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-200 transition"
        >
          LOGIN
        </button>
      </form>

      <!-- Signup Link -->
      <p class="mt-4 text-sm text-gray-900">
        New User?
        <router-link to="/sign-up" class="font-semibold hover:underline">Sign up</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')

const handleLogin = () => {
  if (username.value.trim() && password.value.trim()) {
    localStorage.setItem('isLoggedIn', 'true')
    // Dispatch custom event to notify Navbar of login state change
    window.dispatchEvent(new Event('login-state-changed'))
    alert('Logged in successfully!')
    router.push('/dashboard')
  }
}
</script>
