<template>
  <main class="min-h-screen bg-[#F8F3EA] pt-24 pb-16 flex items-center justify-center">
    <div class="container-custom max-w-md">
      <!-- Card Register -->
      <div class="card-custom bg-white p-6 sm:p-8 relative">
        <div class="text-center mb-6">
          <div class="w-14 h-14 bg-[#FFF0E4] rounded-full text-[#E9823D] flex items-center justify-center text-2xl mx-auto mb-3">
            🐾
          </div>
          <h1 class="text-2xl font-bold text-[#2D2926]">Buat Akun AdopKucing</h1>
          <p class="text-xs text-[#77716B] mt-1">
            Daftar untuk mengakses fitur adopsi, laporan rescue, dan donasi.
          </p>
        </div>

        <!-- Success Notification -->
        <div v-if="successMsg" class="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl">
          {{ successMsg }}
        </div>

        <form @submit.prevent="handleSignup" class="space-y-4">
          <!-- Nama Lengkap -->
          <div>
            <label class="block text-xs font-bold text-[#2D2926] uppercase mb-1">Nama Lengkap *</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Masukkan nama lengkap Anda"
              :class="{'input-error': errors.name}"
            />
            <p v-if="errors.name" class="text-xs text-red-500 mt-1 font-medium">{{ errors.name }}</p>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-xs font-bold text-[#2D2926] uppercase mb-1">Alamat Email *</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="nama@email.com"
              :class="{'input-error': errors.email}"
            />
            <p v-if="errors.email" class="text-xs text-red-500 mt-1 font-medium">{{ errors.email }}</p>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-xs font-bold text-[#2D2926] uppercase mb-1">Kata Sandi (Min. 6 Karakter) *</label>
            <input
              v-model="form.password"
              type="password"
              placeholder="••••••••"
              :class="{'input-error': errors.password}"
            />
            <p v-if="errors.password" class="text-xs text-red-500 mt-1 font-medium">{{ errors.password }}</p>
          </div>

          <!-- Konfirmasi Password -->
          <div>
            <label class="block text-xs font-bold text-[#2D2926] uppercase mb-1">Konfirmasi Kata Sandi *</label>
            <input
              v-model="form.confirmPassword"
              type="password"
              placeholder="••••••••"
              :class="{'input-error': errors.confirmPassword}"
            />
            <p v-if="errors.confirmPassword" class="text-xs text-red-500 mt-1 font-medium">{{ errors.confirmPassword }}</p>
          </div>

          <!-- Submit Button -->
          <div class="pt-2">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="btn btn-primary w-full py-3 text-sm font-bold shadow-md hover:shadow-lg rounded-xl"
            >
              <span v-if="isSubmitting" class="inline-flex items-center gap-2">
                <span>⏳</span> Memproses Pendaftaran...
              </span>
              <span v-else>Daftar Akun Baru</span>
            </button>
          </div>
        </form>

        <!-- Demo Disclaimer -->
        <div class="mt-6 p-3 bg-[#F8F3EA] rounded-xl border border-[#E9E0D5] text-[11px] text-[#77716B]">
          ℹ️ <strong>Mode Demo Lokal:</strong> Data pendaftaran disimpan pada <code>localStorage</code> browser ini.
        </div>

        <p class="text-xs text-center text-[#77716B] mt-5">
          Sudah memiliki akun?
          <router-link to="/login" class="font-bold text-[#E9823D] hover:underline">
            Masuk Sekarang
          </router-link>
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { saveUser, getUsers } from '@/utils/storage'

const router = useRouter()

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const errors = ref({})
const successMsg = ref('')
const isSubmitting = ref(false)

const validateForm = () => {
  const newErrors = {}

  if (!form.value.name.trim()) {
    newErrors.name = 'Nama lengkap wajib diisi.'
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.value.email.trim()) {
    newErrors.email = 'Alamat email wajib diisi.'
  } else if (!emailRegex.test(form.value.email.trim())) {
    newErrors.email = 'Format email tidak valid.'
  } else {
    // Check if email already registered
    const existing = getUsers().find(u => u.email.toLowerCase() === form.value.email.trim().toLowerCase())
    if (existing) {
      newErrors.email = 'Email ini sudah terdaftar. Silakan login.'
    }
  }

  if (!form.value.password) {
    newErrors.password = 'Kata sandi wajib diisi.'
  } else if (form.value.password.length < 6) {
    newErrors.password = 'Kata sandi minimal 6 karakter.'
  }

  if (!form.value.confirmPassword) {
    newErrors.confirmPassword = 'Konfirmasi kata sandi wajib diisi.'
  } else if (form.value.confirmPassword !== form.value.password) {
    newErrors.confirmPassword = 'Konfirmasi kata sandi tidak cocok.'
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleSignup = () => {
  if (!validateForm() || isSubmitting.value) return

  isSubmitting.value = true

  const newUser = {
    name: form.value.name.trim(),
    username: form.value.name.trim().split(' ')[0],
    email: form.value.email.trim().toLowerCase(),
    password: form.value.password,
    phone: '081234567890',
    joinedAt: new Date().toISOString()
  }

  saveUser(newUser)
  successMsg.value = 'Akun berhasil dibuat! Mengalihkan ke halaman login...'

  setTimeout(() => {
    isSubmitting.value = false
    router.push('/login')
  }, 1200)
}
</script>

<style scoped></style>
