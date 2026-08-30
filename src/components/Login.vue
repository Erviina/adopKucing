<template>
  <main class="min-h-screen bg-[#F8F3EA] pt-24 pb-16 flex items-center justify-center">
    <div class="container-custom max-w-md">
      <!-- Card Login -->
      <div class="card-custom bg-white p-6 sm:p-8 relative">
        <div class="text-center mb-6">
          <div class="w-14 h-14 bg-[#FFF0E4] rounded-full text-[#E9823D] flex items-center justify-center text-2xl mx-auto mb-3">
            🐱
          </div>
          <h1 class="text-2xl font-bold text-[#2D2926]">Selamat Datang Kembali</h1>
          <p class="text-xs text-[#77716B] mt-1">
            Masuk ke akun AdopKucing Anda untuk melanjutkan.
          </p>
        </div>

        <!-- Global Error Notification -->
        <div v-if="loginError" class="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl">
          ⚠️ {{ loginError }}
        </div>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <!-- Email / Username -->
          <div>
            <label class="block text-xs font-bold text-[#2D2926] uppercase mb-1">Email / Username *</label>
            <input
              v-model="email"
              type="text"
              placeholder="nama@email.com atau username"
              :class="{'input-error': errors.email}"
            />
            <p v-if="errors.email" class="text-xs text-red-500 mt-1 font-medium">{{ errors.email }}</p>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-xs font-bold text-[#2D2926] uppercase mb-1">Kata Sandi *</label>
            <input
              v-model="password"
              type="password"
              placeholder="••••••••"
              :class="{'input-error': errors.password}"
            />
            <p v-if="errors.password" class="text-xs text-red-500 mt-1 font-medium">{{ errors.password }}</p>
          </div>

          <!-- Submit Button -->
          <div class="pt-2">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="btn btn-primary w-full py-3 text-sm font-bold shadow-md hover:shadow-lg rounded-xl"
            >
              <span v-if="isSubmitting" class="inline-flex items-center gap-2">
                <span>⏳</span> Memproses Masuk...
              </span>
              <span v-else>Masuk Akun</span>
            </button>
          </div>
        </form>

        <!-- Demo Credentials Helper -->
        <div class="mt-6 p-3 bg-[#F8F3EA] rounded-xl border border-[#E9E0D5] text-[11px] text-[#77716B]">
          💡 <strong>Demo Quick Login:</strong> Gunakan email terdaftar Anda atau ketik email/username bebas (password apa saja) untuk mencoba mode demo.
        </div>

        <p class="text-xs text-center text-[#77716B] mt-5">
          Belum memiliki akun?
          <router-link to="/sign-up" class="font-bold text-[#E9823D] hover:underline">
            Daftar Sekarang
          </router-link>
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getUsers, setCurrentUser } from '@/utils/storage'

const router = useRouter()

const email = ref('')
const password = ref('')
const errors = ref({})
const loginError = ref('')
const isSubmitting = ref(false)

const validateForm = () => {
  const newErrors = {}

  if (!email.value.trim()) {
    newErrors.email = 'Email atau username wajib diisi.'
  }

  if (!password.value) {
    newErrors.password = 'Kata sandi wajib diisi.'
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleLogin = () => {
  loginError.value = ''
  if (!validateForm() || isSubmitting.value) return

  isSubmitting.value = true

  setTimeout(() => {
    const inputEmail = email.value.trim().toLowerCase()
    const users = getUsers()

    // 1. Cari user di storage
    let matchedUser = users.find(
      u => u.email.toLowerCase() === inputEmail || u.username.toLowerCase() === inputEmail
    )

    // 2. Fallback demo user jika belum ada user mendaftar
    if (!matchedUser) {
      matchedUser = {
        name: email.value.trim().includes('@') ? email.value.split('@')[0] : email.value.trim(),
        username: email.value.trim(),
        email: email.value.trim().includes('@') ? email.value.trim() : `${email.value.trim()}@adopkucing.com`,
        phone: '08220000118',
        joinedAt: new Date().toISOString()
      }
    }

    // Set logged in session
    setCurrentUser(matchedUser)
    isSubmitting.value = false
    router.push('/profile')
  }, 300)
}
</script>

<style scoped></style>
