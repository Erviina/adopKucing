<template>
  <main class="min-h-screen bg-[#F8F3EA] pt-24 pb-16">
    <div class="container-custom max-w-4xl mx-auto">
      <!-- Jika Kucing Ditemukan -->
      <div v-if="cat">
        <!-- Back Link -->
        <div class="mb-6">
          <button
            @click="$router.push('/adoption')"
            class="inline-flex items-center gap-2 text-sm font-semibold text-[#E9823D] hover:text-[#C96A29] transition cursor-pointer"
          >
            &larr; Kembali ke Pusat Adopsi
          </button>
        </div>

        <!-- 1. Cat Detail Header & Card -->
        <div class="card-custom bg-white p-6 sm:p-8 mb-10">
          <div class="flex flex-col md:flex-row gap-6 items-start">
            <!-- Main Cat Image -->
            <div class="w-full md:w-1/2 relative rounded-2xl overflow-hidden shadow-md">
              <img
                :src="cat.imageUrl"
                :alt="cat.name"
                class="w-full h-72 sm:h-80 object-cover"
              />
              <span
                class="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full shadow-sm"
                :class="getStatusBadgeClass(cat.status)"
              >
                {{ cat.status }}
              </span>
            </div>

            <!-- Cat Details -->
            <div class="w-full md:w-1/2 space-y-4">
              <div class="flex items-center justify-between">
                <h1 class="text-3xl sm:text-4xl font-extrabold text-[#2D2926]">{{ cat.name }}</h1>
                <span class="px-3 py-1 rounded-full bg-[#FFF0E4] text-[#C96A29] text-xs font-bold">
                  {{ cat.gender === 'Jantan' ? 'Jantan ♂' : 'Betina ♀' }}
                </span>
              </div>

              <!-- Quick Info Badges -->
              <div class="grid grid-cols-3 gap-2 py-2">
                <div class="p-2.5 bg-[#F8F3EA] rounded-xl text-center border border-[#E9E0D5]">
                  <p class="text-[10px] text-[#77716B] font-semibold uppercase">Umur</p>
                  <p class="text-xs sm:text-sm font-bold text-[#2D2926]">{{ cat.age }}</p>
                </div>
                <div class="p-2.5 bg-[#F8F3EA] rounded-xl text-center border border-[#E9E0D5]">
                  <p class="text-[10px] text-[#77716B] font-semibold uppercase">Ras</p>
                  <p class="text-xs sm:text-sm font-bold text-[#2D2926] truncate">{{ cat.breed }}</p>
                </div>
                <div class="p-2.5 bg-[#F8F3EA] rounded-xl text-center border border-[#E9E0D5]">
                  <p class="text-[10px] text-[#77716B] font-semibold uppercase">Lokasi</p>
                  <p class="text-xs sm:text-sm font-bold text-[#2D2926] truncate">{{ cat.location }}</p>
                </div>
              </div>

              <!-- Health & Status Information Card -->
              <div class="p-4 bg-[#FFF0E4] rounded-xl border border-[#E9E0D5] space-y-2">
                <h4 class="text-xs font-bold text-[#C96A29] uppercase tracking-wider">Kondisi Kesehatan & Perawatan</h4>
                <p class="text-xs text-[#2D2926] font-medium">🩺 {{ cat.healthStatus }}</p>
                <div class="flex gap-4 text-xs font-medium pt-1">
                  <span :class="cat.vaccinated ? 'text-[#3D9B6D]' : 'text-[#77716B]'">
                    {{ cat.vaccinated ? '✓ Sudah Divaksin' : '✗ Belum Divaksin' }}
                  </span>
                  <span :class="cat.sterilized ? 'text-[#3D9B6D]' : 'text-[#77716B]'">
                    {{ cat.sterilized ? '✓ Sudah Disteril' : '✗ Belum Disteril' }}
                  </span>
                </div>
              </div>

              <!-- Description -->
              <div>
                <h4 class="text-xs font-bold text-[#77716B] uppercase tracking-wider mb-1">Tentang {{ cat.name }}</h4>
                <p class="text-sm text-[#77716B] leading-relaxed">
                  {{ cat.description }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Adoption Form or Success State -->
        <div v-if="!isSubmitted" class="card-custom bg-white p-6 sm:p-8">
          <!-- Header Banner Pengajuan Kucing -->
          <div class="mb-6 p-4 rounded-xl bg-[#FFF0E4] border border-[#E9E0D5] flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <img :src="cat.imageUrl" class="w-12 h-12 object-cover rounded-lg border border-[#E9E0D5]" :alt="cat.name" />
              <div>
                <p class="text-xs text-[#C96A29] font-semibold uppercase">Mengajukan Adopsi Untuk</p>
                <h3 class="text-lg font-bold text-[#2D2926]">{{ cat.name }} ({{ cat.breed }} • {{ cat.age }})</h3>
              </div>
            </div>
            <span class="hidden sm:inline-block px-3 py-1 bg-white rounded-full text-xs font-semibold text-[#E9823D] border border-[#E9E0D5]">
              📍 {{ cat.location }}
            </span>
          </div>

          <h2 class="text-2xl font-bold text-[#2D2926] mb-2 text-center">Formulir Permohonan Adopsi</h2>
          <p class="text-sm text-[#77716B] text-center mb-8">
            Lengkapi data calon adopter di bawah ini secara jujur untuk mempermudah verifikasi tim relawan.
          </p>

          <form @submit.prevent="handleSubmit" class="space-y-5">
            <!-- Nama Lengkap -->
            <div>
              <label class="block text-xs font-bold text-[#2D2926] uppercase mb-1">Nama Lengkap *</label>
              <input
                v-model="form.name"
                type="text"
                placeholder="Contoh: Budi Santoso"
                :class="{'input-error': errors.name}"
              />
              <p v-if="errors.name" class="text-xs text-red-500 mt-1 font-medium">{{ errors.name }}</p>
            </div>

            <!-- Grid: Email & Telepon -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

              <div>
                <label class="block text-xs font-bold text-[#2D2926] uppercase mb-1">No. Telepon / WhatsApp *</label>
                <input
                  v-model="form.phone"
                  type="tel"
                  placeholder="081234567890"
                  :class="{'input-error': errors.phone}"
                />
                <p v-if="errors.phone" class="text-xs text-red-500 mt-1 font-medium">{{ errors.phone }}</p>
              </div>
            </div>

            <!-- Grid: Alamat & Pekerjaan -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-[#2D2926] uppercase mb-1">Alamat Lengkap / Kota *</label>
                <input
                  v-model="form.address"
                  type="text"
                  placeholder="Jl. Merdeka No. 12, Bandung"
                  :class="{'input-error': errors.address}"
                />
                <p v-if="errors.address" class="text-xs text-red-500 mt-1 font-medium">{{ errors.address }}</p>
              </div>

              <div>
                <label class="block text-xs font-bold text-[#2D2926] uppercase mb-1">Pekerjaan / Kesibukan Utama *</label>
                <input
                  v-model="form.occupation"
                  type="text"
                  placeholder="Karyawan / Mahasiswa / Wirausaha"
                  :class="{'input-error': errors.occupation}"
                />
                <p v-if="errors.occupation" class="text-xs text-red-500 mt-1 font-medium">{{ errors.occupation }}</p>
              </div>
            </div>

            <!-- Pengalaman Memelihara Hewan -->
            <div>
              <label class="block text-xs font-bold text-[#2D2926] uppercase mb-1">Pengalaman Memelihara Hewan *</label>
              <select v-model="form.experience" :class="{'input-error': errors.experience}">
                <option value="">Pilih pengalaman Anda</option>
                <option value="Sedang Memelihara Kucing">Sedang Memelihara Kucing</option>
                <option value="Pernah Memelihara Kucing Sebelumnya">Pernah Memelihara Kucing Sebelumnya</option>
                <option value="Pernah Memelihara Hewan Lain">Pernah Memelihara Hewan Lain (Anjing/Kelinci/dll)</option>
                <option value="Belum Pernah (Pemula)">Belum Pernah (Pertama Kali)</option>
              </select>
              <p v-if="errors.experience" class="text-xs text-red-500 mt-1 font-medium">{{ errors.experience }}</p>
            </div>

            <!-- Alasan Adopsi -->
            <div>
              <label class="block text-xs font-bold text-[#2D2926] uppercase mb-1">Alasan Ingin Mengadopsi {{ cat.name }} *</label>
              <textarea
                v-model="form.reason"
                rows="3"
                placeholder="Ceritakan alasan dan komitmen Anda untuk merawat kucing ini..."
                :class="{'input-error': errors.reason}"
              ></textarea>
              <p v-if="errors.reason" class="text-xs text-red-500 mt-1 font-medium">{{ errors.reason }}</p>
            </div>

            <!-- Checkbox Syarat & Ketentuan -->
            <div class="pt-2">
              <label class="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  v-model="form.agreed"
                  class="mt-1 h-4 w-4 text-[#E9823D] border-[#E9E0D5] rounded focus:ring-[#E9823D]"
                />
                <span class="text-xs text-[#77716B]">
                  Saya menyatakan data di atas benar, berniat memelihara {{ cat.name }} dengan penuh tanggung jawab, serta menyetujui
                  <router-link to="/terms" class="text-[#E9823D] font-bold hover:underline">
                    Syarat & Ketentuan Adopsi
                  </router-link>.
                </span>
              </label>
              <p v-if="errors.agreed" class="text-xs text-red-500 mt-1 font-medium">{{ errors.agreed }}</p>
            </div>

            <!-- Submit Button -->
            <div class="pt-4">
              <button
                type="submit"
                :disabled="isSubmitting"
                class="btn btn-primary w-full py-3.5 text-base font-bold shadow-md hover:shadow-lg"
              >
                <span v-if="isSubmitting" class="inline-flex items-center gap-2">
                  <span>⏳</span> Memproses Permohonan...
                </span>
                <span v-else>Kirim Formulir Adopsi</span>
              </button>
            </div>
          </form>
        </div>

        <!-- 3. Success State View (Simulasi Demo) -->
        <div v-else class="card-custom bg-white p-8 sm:p-12 text-center max-w-2xl mx-auto">
          <div class="w-16 h-16 bg-[#FFF0E4] text-[#E9823D] rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
            🎉
          </div>

          <h2 class="text-2xl sm:text-3xl font-extrabold text-[#2D2926] mb-3">
            Permohonan Adopsi Berhasil Dikirim!
          </h2>

          <p class="text-[#77716B] text-sm sm:text-base leading-relaxed mb-6">
            Terima kasih <strong class="text-[#2D2926]">{{ form.name }}</strong>! Permohonan adopsi Anda untuk <strong class="text-[#E9823D]">{{ cat.name }}</strong> telah berhasil dicatat.
          </p>

          <!-- Portfolio Demo Indicator Badge -->
          <div class="p-4 bg-[#F8F3EA] rounded-xl border border-[#E9E0D5] text-xs text-[#77716B] text-left mb-8 space-y-1">
            <p class="font-bold text-[#C96A29] uppercase tracking-wider">ℹ️ Catatan Simulasi Portofolio Demo</p>
            <p>
              Data permohonan Anda tersimpan sementara pada <code>localStorage</code> browser ini. Ini adalah demonstrasi antarmuka frontend tanpa koneksi server backend aktual.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <router-link to="/adoption" class="btn btn-primary px-6 py-3 text-sm">
              Kembali ke Pusat Adopsi
            </router-link>
            <router-link to="/" class="btn btn-outline px-6 py-3 text-sm">
              Ke Halaman Beranda
            </router-link>
          </div>
        </div>
      </div>

      <!-- Jika Kucing Tidak Ditemukan -->
      <div v-else class="card-custom bg-white p-12 text-center max-w-lg mx-auto">
        <div class="text-5xl mb-4">😿</div>
        <h2 class="text-2xl font-bold text-[#2D2926] mb-2">Kucing Tidak Ditemukan</h2>
        <p class="text-[#77716B] text-sm leading-relaxed mb-6">
          Data kucing dengan ID yang Anda tuju tidak ditemukan dalam sistem kami.
        </p>
        <router-link to="/adoption" class="btn btn-primary px-6 py-3 text-sm">
          Kembali ke Pusat Adopsi
        </router-link>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import catsData from "@/data/cats"

const route = useRoute()
const cat = ref(null)

const form = ref({
  name: "",
  email: "",
  phone: "",
  address: "",
  occupation: "",
  experience: "",
  reason: "",
  agreed: false
})

const errors = ref({})
const isSubmitted = ref(false)

const getStatusBadgeClass = (status) => {
  switch (status) {
    case "Tersedia":
      return "bg-[#3D9B6D] text-white"
    case "Proses Adopsi":
      return "bg-[#D99A2B] text-white"
    case "Dalam Perawatan":
      return "bg-[#15B2D5] text-white"
    default:
      return "bg-[#77716B] text-white"
  }
}

const validateForm = () => {
  const newErrors = {}

  if (!form.value.name.trim()) {
    newErrors.name = "Nama lengkap wajib diisi."
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.value.email.trim()) {
    newErrors.email = "Alamat email wajib diisi."
  } else if (!emailRegex.test(form.value.email.trim())) {
    newErrors.email = "Format email tidak valid (contoh: nama@email.com)."
  }

  const phoneRegex = /^[0-9\-\+\s]{10,15}$/
  if (!form.value.phone.trim()) {
    newErrors.phone = "Nomor telepon / WA wajib diisi."
  } else if (!phoneRegex.test(form.value.phone.trim())) {
    newErrors.phone = "Nomor telepon tidak valid (minimal 10 digit)."
  }

  if (!form.value.address.trim()) {
    newErrors.address = "Alamat lengkap / kota wajib diisi."
  }

  if (!form.value.occupation.trim()) {
    newErrors.occupation = "Pekerjaan / aktivitas wajib diisi."
  }

  if (!form.value.experience.trim()) {
    newErrors.experience = "Pengalaman memelihara hewan wajib diisi."
  }

  if (!form.value.reason.trim()) {
    newErrors.reason = "Alasan adopsi wajib diisi."
  } else if (form.value.reason.trim().length < 15) {
    newErrors.reason = "Alasan adopsi terlalu singkat (minimal 15 karakter)."
  }

  if (!form.value.agreed) {
    newErrors.agreed = "Anda wajib menyetujui Syarat & Ketentuan Adopsi."
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const isSubmitting = ref(false)

const handleSubmit = () => {
  if (!validateForm() || isSubmitting.value) {
    return
  }

  isSubmitting.value = true

  setTimeout(() => {
    // Save submission to localStorage demo storage
    const submissionData = {
      catId: cat.value.id,
      catName: cat.value.name,
      applicant: { ...form.value },
      submittedAt: new Date().toISOString()
    }

    const existingSubmissions = JSON.parse(localStorage.getItem("adoption_submissions") || "[]")
    existingSubmissions.push(submissionData)
    localStorage.setItem("adoption_submissions", JSON.stringify(existingSubmissions))

    isSubmitted.value = true
    isSubmitting.value = false
  }, 400)
}

onMounted(() => {
  const catId = parseInt(route.params.id)
  cat.value = catsData.find((c) => c.id === catId) || null
})
</script>

<style scoped>
</style>
