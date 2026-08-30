<template>
  <main class="min-h-screen bg-[#F8F3EA] pt-24 pb-16">
    <div class="container-custom max-w-4xl">
      <!-- Page Header -->
      <div class="text-center max-w-2xl mx-auto mb-8">
        <div class="inline-flex items-center gap-2 px-3.5 py-1 bg-red-100 border border-red-200 rounded-full text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
          🚨 Penyelamatan & Laporan Darurat
        </div>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-[#2D2926] mb-3">
          Report & Rescue Kucing
        </h1>
        <p class="text-[#77716B] text-sm sm:text-base">
          Temukan kucing jalanan yang sakit, terluka, atau butuh bantuan? Laporkan lokasi dan kondisi mereka agar tim tim relawan rescue dapat bertindak cepat.
        </p>
      </div>

      <!-- Navigation Tabs: Buat Laporan vs Riwayat Laporan -->
      <div class="flex justify-center mb-8">
        <div class="bg-white p-1.5 rounded-2xl border border-[#E9E0D5] shadow-sm inline-flex gap-2">
          <button
            @click="activeTab = 'form'"
            class="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer"
            :class="activeTab === 'form' ? 'bg-[#E9823D] text-white shadow-sm' : 'text-[#77716B] hover:text-[#2D2926]'"
          >
            📝 Buat Laporan Baru
          </button>
          <button
            @click="activeTab = 'history'"
            class="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-2"
            :class="activeTab === 'history' ? 'bg-[#E9823D] text-white shadow-sm' : 'text-[#77716B] hover:text-[#2D2926]'"
          >
            <span>📋 Riwayat Laporan</span>
            <span
              v-if="reports.length > 0"
              class="px-2 py-0.5 text-[10px] rounded-full"
              :class="activeTab === 'history' ? 'bg-white text-[#E9823D]' : 'bg-[#FFF0E4] text-[#C96A29]'"
            >
              {{ reports.length }}
            </span>
          </button>
        </div>
      </div>

      <!-- TAB 1: FORM LAPORAN -->
      <div v-if="activeTab === 'form'" class="card-custom bg-white p-6 sm:p-10">
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- SECTION 1: INFORMASI UTAMA (WAJIB) -->
          <div>
            <h3 class="text-base font-extrabold text-[#2D2926] border-b border-[#E9E0D5] pb-2 mb-4 flex items-center gap-2">
              <span>📌</span> Informasi Utama (Wajib)
            </h3>

            <div class="space-y-5">
              <!-- Upload Foto Kucing -->
              <div>
                <label class="block text-xs font-bold text-[#2D2926] uppercase mb-1">Foto Kucing (Opsional / Sangat Dianjurkan)</label>
                <div
                  class="border-2 border-dashed border-[#E9E0D5] hover:border-[#E9823D] rounded-2xl p-6 text-center bg-[#F8F3EA]/50 transition cursor-pointer"
                  @click="triggerFileInput"
                >
                  <input
                    ref="fileInputRef"
                    type="file"
                    accept="image/*"
                    multiple
                    @change="handleFileUpload"
                    class="hidden"
                  />
                  <div class="text-3xl mb-2">📸</div>
                  <p class="text-sm font-semibold text-[#2D2926]">Klik untuk memilih foto kucing</p>
                  <p class="text-xs text-[#77716B] mt-1">PNG, JPG, JPEG (Maks. 3 foto - disimpan di browser lokal)</p>
                </div>

                <!-- Preview Foto -->
                <div v-if="photoPreviews.length > 0" class="flex flex-wrap gap-3 mt-3">
                  <div
                    v-for="(photo, index) in photoPreviews"
                    :key="index"
                    class="relative w-20 h-20 rounded-xl overflow-hidden border border-[#E9E0D5] shadow-sm group"
                  >
                    <img :src="photo" class="w-full h-full object-cover" />
                    <button
                      type="button"
                      @click="removePhoto(index)"
                      class="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center shadow-md hover:bg-red-700"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>

              <!-- Lokasi Ditemukan -->
              <div>
                <label class="block text-xs font-bold text-[#2D2926] uppercase mb-1">Lokasi Ditemukan *</label>
                <input
                  v-model="form.location"
                  type="text"
                  placeholder="Contoh: Jl. Asia Afrika No. 45 (depan Taman Vanda), Bandung"
                  :class="{'input-error': errors.location}"
                />
                <p v-if="errors.location" class="text-xs text-red-500 mt-1 font-medium">{{ errors.location }}</p>
              </div>

              <!-- Kondisi Kucing -->
              <div>
                <label class="block text-xs font-bold text-[#2D2926] uppercase mb-1">Kondisi Kucing *</label>
                <select v-model="form.condition" :class="{'input-error': errors.condition}">
                  <option value="">Pilih kondisi kucing saat ini</option>
                  <option value="Sehat tetapi terlantar">Sehat tetapi terlantar</option>
                  <option value="Terluka ringan">Terluka ringan</option>
                  <option value="Terluka parah">Terluka parah</option>
                  <option value="Sakit">Sakit / Lemah</option>
                  <option value="Terjebak">Terjebak (di atap/pohon/sumur)</option>
                  <option value="Membutuhkan pertolongan segera">Membutuhkan pertolongan medis segera</option>
                </select>
                <p v-if="errors.condition" class="text-xs text-red-500 mt-1 font-medium">{{ errors.condition }}</p>
              </div>

              <!-- Deskripsi Kejadian -->
              <div>
                <label class="block text-xs font-bold text-[#2D2926] uppercase mb-1">Deskripsi Kejadian & Ciri-Ciri *</label>
                <textarea
                  v-model="form.description"
                  rows="3"
                  placeholder="Jelaskan detail posisi kucing, warna bulu, luka yang terlihat, atau petunjuk tempat..."
                  :class="{'input-error': errors.description}"
                ></textarea>
                <p v-if="errors.description" class="text-xs text-red-500 mt-1 font-medium">{{ errors.description }}</p>
              </div>

              <!-- Kontak Pelapor -->
              <div>
                <label class="block text-xs font-bold text-[#2D2926] uppercase mb-1">Nomor Kontak Pelapor (WhatsApp/HP) *</label>
                <input
                  v-model="form.contact"
                  type="tel"
                  placeholder="081234567890 (agar tim rescue dapat menghubungi lokasi)"
                  :class="{'input-error': errors.contact}"
                />
                <p v-if="errors.contact" class="text-xs text-red-500 mt-1 font-medium">{{ errors.contact }}</p>
              </div>
            </div>
          </div>

          <!-- SECTION 2: INFORMASI TAMBAHAN (OPSIONAL) -->
          <div>
            <h3 class="text-base font-extrabold text-[#2D2926] border-b border-[#E9E0D5] pb-2 mb-4 flex items-center gap-2">
              <span>📋</span> Informasi Tambahan (Opsional)
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-[#2D2926] uppercase mb-1">Nama Panggilan (Opsional)</label>
                <input
                  v-model="form.tempName"
                  type="text"
                  placeholder="Nama sementara jika ada"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-[#2D2926] uppercase mb-1">Perkiraan Umur</label>
                <select v-model="form.estimatedAge">
                  <option value="">Tidak tahu</option>
                  <option value="Anak Kucing (< 6 bulan)">Anak Kucing (&lt; 6 bulan)</option>
                  <option value="Kucing Remaja (6-12 bulan)">Kucing Remaja (6-12 bulan)</option>
                  <option value="Kucing Dewasa (> 1 tahun)">Kucing Dewasa (&gt; 1 tahun)</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold text-[#2D2926] uppercase mb-1">Jenis Kelamin</label>
                <select v-model="form.gender">
                  <option value="Tidak Tahu">Tidak Tahu</option>
                  <option value="Jantan">Jantan ♂</option>
                  <option value="Betina">Betina ♀</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold text-[#2D2926] uppercase mb-1">Ras / Jenis Kucing</label>
                <input
                  v-model="form.breed"
                  type="text"
                  placeholder="Contoh: Domestik / Kampong / Mix Persia"
                />
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="pt-4">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="btn btn-danger w-full py-3.5 text-base font-bold shadow-lg hover:shadow-xl rounded-xl"
            >
              <span v-if="isSubmitting" class="inline-flex items-center gap-2">
                <span>⏳</span> Mengirim Laporan...
              </span>
              <span v-else>🚨 Kirim Laporan Rescue</span>
            </button>
          </div>
        </form>
      </div>

      <!-- TAB 2: RIWAYAT LAPORAN SAYA -->
      <div v-else-if="activeTab === 'history'" class="space-y-4">
        <div v-if="reports.length > 0" class="space-y-4">
          <div
            v-for="rep in reports"
            :key="rep.id"
            class="card-custom bg-white p-5 flex flex-col sm:flex-row gap-5 justify-between items-start"
          >
            <div class="flex gap-4 items-start">
              <img
                :src="rep.photos && rep.photos.length > 0 ? rep.photos[0] : defaultCatImage"
                class="w-20 h-20 object-cover rounded-xl border border-[#E9E0D5] flex-shrink-0"
                alt="Foto laporan"
              />
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="font-mono text-xs font-bold px-2 py-0.5 bg-[#FFF0E4] text-[#C96A29] rounded-md">
                    {{ rep.id }}
                  </span>
                  <span
                    class="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                    :class="getStatusClass(rep.status)"
                  >
                    {{ rep.status }}
                  </span>
                </div>
                <h4 class="font-bold text-[#2D2926] text-base">
                  {{ rep.tempName ? rep.tempName : 'Kucing Rescue' }} — {{ rep.condition }}
                </h4>
                <p class="text-xs text-[#77716B]">📍 {{ rep.location }}</p>
                <p class="text-xs text-[#77716B]">🕒 {{ formatDate(rep.createdAt) }}</p>
                <p class="text-xs text-[#77716B] line-clamp-2 mt-1">"{{ rep.description }}"</p>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="card-custom bg-white p-12 text-center max-w-md mx-auto">
          <div class="text-5xl mb-3">🚨</div>
          <h3 class="text-lg font-bold text-[#2D2926] mb-1">Belum Ada Riwayat Laporan</h3>
          <p class="text-xs text-[#77716B] mb-6">Anda belum pernah membuat laporan penanganan atau rescue kucing jalanan.</p>
          <button @click="activeTab = 'form'" class="btn btn-primary px-6 py-2.5 text-xs font-bold">
            Buat Laporan Sekarang
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL KONFIRMASI SUKSES DEMO -->
    <transition name="fade">
      <div v-if="showSuccessModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div class="card-custom bg-white p-8 max-w-lg w-full text-center relative animate-fadeIn">
          <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
            🚨
          </div>

          <h2 class="text-2xl font-bold text-[#2D2926] mb-2">Laporan Berhasil Dibuat!</h2>
          <p class="text-xs sm:text-sm text-[#77716B] mb-6">
            Terima kasih telah membantu melaporkan kucing yang membutuhkan pertolongan.
          </p>

          <!-- Report Summary Box -->
          <div class="bg-[#F8F3EA] p-4 rounded-xl border border-[#E9E0D5] text-left text-xs space-y-2 mb-6">
            <div class="flex justify-between border-b border-[#E9E0D5] pb-2">
              <span class="text-[#77716B]">ID Laporan:</span>
              <span class="font-mono font-bold text-[#2D2926]">{{ lastReport?.id }}</span>
            </div>
            <div class="flex justify-between border-b border-[#E9E0D5] pb-2">
              <span class="text-[#77716B]">Status Awal:</span>
              <span class="font-bold text-amber-600">🟡 Menunggu Verifikasi</span>
            </div>
            <div class="flex justify-between border-b border-[#E9E0D5] pb-2">
              <span class="text-[#77716B]">Kondisi:</span>
              <span class="font-semibold text-[#2D2926]">{{ lastReport?.condition }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-[#77716B]">Lokasi:</span>
              <span class="font-semibold text-[#2D2926] truncate max-w-[200px]">{{ lastReport?.location }}</span>
            </div>
          </div>

          <div class="p-3 bg-amber-50 rounded-xl border border-amber-200 text-left text-[11px] text-amber-800 mb-6">
            ℹ️ <strong>Mode Portofolio Demo:</strong> Laporan ini disimulasikan dan disimpan di browser lokal (localStorage).
          </div>

          <div class="flex flex-col sm:flex-row gap-3">
            <button @click="goToHistory" class="btn btn-primary flex-1 py-2.5 text-xs font-bold">
              Lihat Laporan Saya
            </button>
            <router-link to="/" class="btn btn-outline flex-1 py-2.5 text-xs font-bold text-center">
              Kembali ke Beranda
            </router-link>
          </div>
        </div>
      </div>
    </transition>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { withBase } from '@/utils/paths'
import { getReports, saveReport } from '@/utils/storage'

const defaultCatImage = withBase('images/home/Cat 9.jpg')

const activeTab = ref('form')
const fileInputRef = ref(null)

const form = ref({
  location: '',
  condition: '',
  description: '',
  contact: '',
  tempName: '',
  estimatedAge: '',
  gender: 'Tidak Tahu',
  breed: '',
  photos: []
})

const photoPreviews = ref([])
const errors = ref({})
const reports = ref([])
const showSuccessModal = ref(false)
const lastReport = ref(null)

const triggerFileInput = () => {
  fileInputRef.value?.click()
}

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files).slice(0, 3)
  files.forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      photoPreviews.value.push(e.target.result)
    }
    reader.readAsDataURL(file)
  })
}

const removePhoto = (index) => {
  photoPreviews.value.splice(index, 1)
}

const validateForm = () => {
  const newErrors = {}

  if (!form.value.location.trim()) {
    newErrors.location = 'Lokasi ditemukan wajib diisi.'
  }

  if (!form.value.condition) {
    newErrors.condition = 'Kondisi kucing wajib dipilih.'
  }

  if (!form.value.description.trim()) {
    newErrors.description = 'Deskripsi kejadian wajib diisi.'
  }

  const phoneRegex = /^[0-9\-\+\s]{10,15}$/
  if (!form.value.contact.trim()) {
    newErrors.contact = 'Nomor kontak pelapor wajib diisi.'
  } else if (!phoneRegex.test(form.value.contact.trim())) {
    newErrors.contact = 'Nomor kontak tidak valid (minimal 10 digit angka).'
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const generateReportId = () => {
  const num = Math.floor(100 + Math.random() * 900)
  return `RSC-2026-${num}`
}

const isSubmitting = ref(false)

const handleSubmit = () => {
  if (!validateForm() || isSubmitting.value) return

  isSubmitting.value = true

  setTimeout(() => {
    const reportData = {
      id: generateReportId(),
      location: form.value.location.trim(),
      condition: form.value.condition,
      description: form.value.description.trim(),
      contact: form.value.contact.trim(),
      tempName: form.value.tempName.trim(),
      estimatedAge: form.value.estimatedAge,
      gender: form.value.gender,
      breed: form.value.breed.trim(),
      photos: photoPreviews.value,
      status: '🟡 Menunggu Verifikasi',
      createdAt: new Date().toISOString()
    }

    saveReport(reportData)
    lastReport.value = reportData
    reports.value = getReports()
    showSuccessModal.value = true
    isSubmitting.value = false

    // Reset form
    form.value = {
      location: '',
      condition: '',
      description: '',
      contact: '',
      tempName: '',
      estimatedAge: '',
      gender: 'Tidak Tahu',
      breed: '',
      photos: []
    }
    photoPreviews.value = []
  }, 400)
}

const goToHistory = () => {
  showSuccessModal.value = false
  activeTab.value = 'history'
}

const getStatusClass = (status) => {
  if (status.includes('Menunggu')) return 'bg-amber-100 text-amber-800 border border-amber-300'
  if (status.includes('Diproses')) return 'bg-blue-100 text-blue-800 border border-blue-300'
  if (status.includes('Berhasil')) return 'bg-emerald-100 text-emerald-800 border border-emerald-300'
  return 'bg-gray-100 text-gray-800'
}

const formatDate = (isoString) => {
  if (!isoString) return ''
  const date = new Date(isoString)
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

onMounted(() => {
  reports.value = getReports()
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
