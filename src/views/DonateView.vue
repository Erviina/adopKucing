<template>
  <main class="min-h-screen bg-[#F8F3EA] pt-24 pb-16">
    <div class="container-custom max-w-5xl">
      <!-- Hero Header -->
      <div class="text-center max-w-3xl mx-auto mb-10">
        <div class="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FFF0E4] border border-[#E9E0D5] rounded-full text-[#C96A29] text-xs font-semibold uppercase tracking-wider mb-3">
          ❤️ Program Donasi Kucing
        </div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2D2926] mb-4">
          Dukunganmu Menyelamatkan <span class="text-[#E9823D]">Nyawa Kucing Jalanan</span>
        </h1>
        <p class="text-[#77716B] text-sm sm:text-base leading-relaxed">
          Setiap rupiah donasimu disalurkan langsung untuk makanan harian, biaya medis darurat, sterilisasi gratis, dan operasional shelter rescue.
        </p>
      </div>

      <!-- Navigation Tabs: Donasi Sekarang vs Riwayat Donasi -->
      <div class="flex justify-center mb-8">
        <div class="bg-white p-1.5 rounded-2xl border border-[#E9E0D5] shadow-sm inline-flex gap-2">
          <button
            @click="activeTab = 'form'"
            class="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer"
            :class="activeTab === 'form' ? 'bg-[#E9823D] text-white shadow-sm' : 'text-[#77716B] hover:text-[#2D2926]'"
          >
            ❤️ Donasi Sekarang
          </button>
          <button
            @click="activeTab = 'history'"
            class="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-2"
            :class="activeTab === 'history' ? 'bg-[#E9823D] text-white shadow-sm' : 'text-[#77716B] hover:text-[#2D2926]'"
          >
            <span>📜 Riwayat Donasi</span>
            <span
              v-if="donations.length > 0"
              class="px-2 py-0.5 text-[10px] rounded-full"
              :class="activeTab === 'history' ? 'bg-white text-[#E9823D]' : 'bg-[#FFF0E4] text-[#C96A29]'"
            >
              {{ donations.length }}
            </span>
          </button>
        </div>
      </div>

      <!-- TAB 1: FORM DONASI -->
      <div v-if="activeTab === 'form'" class="space-y-8">
        <!-- 1. Pilih Program Campaign -->
        <div class="card-custom bg-white p-6 sm:p-8">
          <h2 class="text-lg font-bold text-[#2D2926] mb-4 flex items-center gap-2">
            <span>🎯</span> 1. Pilih Program Donasi
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              v-for="campaign in campaigns"
              :key="campaign.id"
              @click="selectedCampaign = campaign"
              class="p-4 rounded-2xl border transition cursor-pointer flex flex-col justify-between"
              :class="selectedCampaign.id === campaign.id ? 'border-[#E9823D] bg-[#FFF0E4]/60 shadow-md ring-2 ring-[#E9823D]/20' : 'border-[#E9E0D5] bg-white hover:border-[#E9823D]/50'"
            >
              <div>
                <div class="text-3xl mb-2">{{ campaign.icon }}</div>
                <h3 class="font-bold text-[#2D2926] text-sm mb-1">{{ campaign.name }}</h3>
                <p class="text-xs text-[#77716B] leading-relaxed mb-3">{{ campaign.desc }}</p>
              </div>
              <div class="pt-2 border-t border-[#E9E0D5]/60 text-[11px] font-semibold text-[#C96A29]">
                Target: {{ campaign.target }}
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Pilih Nominal Donasi -->
        <div class="card-custom bg-white p-6 sm:p-8">
          <h2 class="text-lg font-bold text-[#2D2926] mb-4 flex items-center gap-2">
            <span>💵</span> 2. Pilih Nominal Donasi
          </h2>

          <!-- Quick Amount Buttons -->
          <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
            <button
              v-for="amount in quickAmounts"
              :key="amount"
              type="button"
              @click="selectQuickAmount(amount)"
              class="py-3 px-4 rounded-xl border text-sm font-bold transition cursor-pointer"
              :class="selectedAmount === amount && !customAmount ? 'bg-[#E9823D] text-white border-[#E9823D] shadow-sm' : 'border-[#E9E0D5] bg-white text-[#2D2926] hover:bg-[#FFF0E4]'"
            >
              Rp {{ formatRupiah(amount) }}
            </button>
          </div>

          <!-- Custom Amount Input -->
          <div>
            <label class="block text-xs font-bold text-[#2D2926] uppercase mb-1">Atau Masukkan Nominal Lainnya (Rp)</label>
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#77716B]">Rp</span>
              <input
                v-model.number="customAmount"
                type="number"
                placeholder="Minimal Rp 5.000"
                class="w-full pl-12 pr-4 py-3 rounded-xl border border-[#E9E0D5] text-sm focus:outline-none focus:border-[#E9823D]"
                @input="onCustomAmountInput"
              />
            </div>
            <p v-if="amountError" class="text-xs text-red-500 mt-1 font-medium">{{ amountError }}</p>
          </div>
        </div>

        <!-- 3. Informasi Donatur & Metode Pembayaran Demo -->
        <div class="card-custom bg-white p-6 sm:p-8 space-y-6">
          <h2 class="text-lg font-bold text-[#2D2926] mb-2 flex items-center gap-2">
            <span>👤</span> 3. Informasi Donatur & Pembayaran Demo
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-[#2D2926] uppercase mb-1">Nama Donatur *</label>
              <input
                v-model="donorName"
                type="text"
                placeholder="Nama Anda"
                :disabled="isAnonymous"
                :class="{'input-error': errors.donorName}"
              />
              <p v-if="errors.donorName" class="text-xs text-red-500 mt-1 font-medium">{{ errors.donorName }}</p>

              <label class="flex items-center gap-2 mt-2 cursor-pointer">
                <input
                  type="checkbox"
                  v-model="isAnonymous"
                  class="h-4 w-4 text-[#E9823D] rounded border-[#E9E0D5]"
                />
                <span class="text-xs text-[#77716B]">Donasi sebagai Anonim (Hamba Allah)</span>
              </label>
            </div>

            <div>
              <label class="block text-xs font-bold text-[#2D2926] uppercase mb-1">Alamat Email *</label>
              <input
                v-model="donorEmail"
                type="email"
                placeholder="nama@email.com"
                :class="{'input-error': errors.donorEmail}"
              />
              <p v-if="errors.donorEmail" class="text-xs text-red-500 mt-1 font-medium">{{ errors.donorEmail }}</p>
            </div>
          </div>

          <!-- Payment Methods Demo -->
          <div>
            <label class="block text-xs font-bold text-[#2D2926] uppercase mb-2">Pilih Kanal Pembayaran Simulasi (Demo) *</label>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                v-for="method in paymentMethods"
                :key="method.id"
                type="button"
                @click="selectedMethod = method"
                class="p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition cursor-pointer"
                :class="selectedMethod.id === method.id ? 'border-[#E9823D] bg-[#FFF0E4] text-[#E9823D] ring-2 ring-[#E9823D]/20' : 'border-[#E9E0D5] bg-white text-[#2D2926] hover:bg-[#F8F3EA]'"
              >
                <span class="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-extrabold bg-[#2D2926] text-white">
                  {{ method.badge }}
                </span>
                <span>{{ method.name }}</span>
              </button>
            </div>
            <p v-if="errors.method" class="text-xs text-red-500 mt-1 font-medium">{{ errors.method }}</p>
          </div>

          <!-- Submit Button -->
          <div class="pt-4">
            <button
              type="button"
              @click="handleDonate"
              :disabled="isSubmitting"
              class="btn btn-primary w-full py-4 text-base font-bold shadow-lg hover:shadow-xl rounded-xl"
            >
              <span v-if="isSubmitting" class="inline-flex items-center gap-2">
                <span>⏳</span> Memproses Donasi...
              </span>
              <span v-else>❤️ Salurkan Donasi Rp {{ formatRupiah(finalAmount) }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- TAB 2: RIWAYAT DONASI SAYA -->
      <div v-else-if="activeTab === 'history'" class="space-y-4">
        <div v-if="donations.length > 0" class="space-y-4">
          <div
            v-for="don in donations"
            :key="don.id"
            class="card-custom bg-white p-5 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center"
          >
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 rounded-2xl bg-[#FFF0E4] text-[#E9823D] flex items-center justify-center text-2xl flex-shrink-0">
                ❤️
              </div>
              <div>
                <h4 class="font-bold text-[#2D2926] text-base">{{ don.campaignName }}</h4>
                <p class="text-xs text-[#77716B]">Donatur: {{ don.donorName }} • {{ formatDate(don.createdAt) }}</p>
                <p class="text-xs text-[#C96A29] font-medium">Kanal: {{ don.methodName }}</p>
              </div>
            </div>

            <div class="text-right sm:text-right w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-[#E9E0D5]">
              <p class="text-lg font-extrabold text-[#3D9B6D]">Rp {{ formatRupiah(don.amount) }}</p>
              <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                Simulasi Donasi Berhasil
              </span>
            </div>
          </div>
        </div>

        <div v-else class="card-custom bg-white p-12 text-center max-w-md mx-auto">
          <div class="text-5xl mb-3">❤️</div>
          <h3 class="text-lg font-bold text-[#2D2926] mb-1">Belum Ada Riwayat Donasi</h3>
          <p class="text-xs text-[#77716B] mb-6">Dukungan kecilmu dapat membantu memberikan kehidupan yang lebih baik bagi kucing jalanan.</p>
          <button @click="activeTab = 'form'" class="btn btn-primary px-6 py-2.5 text-xs font-bold">
            Donasi Sekarang
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL KONFIRMASI DONASI DEMO -->
    <transition name="fade">
      <div v-if="showSuccessModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div class="card-custom bg-white p-8 max-w-lg w-full text-center relative animate-fadeIn">
          <div class="w-16 h-16 bg-[#FFF0E4] text-[#E9823D] rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
            ❤️
          </div>

          <h2 class="text-2xl font-bold text-[#2D2926] mb-2">Terima Kasih atas Dukunganmu!</h2>
          <p class="text-xs sm:text-sm text-[#77716B] mb-6">
            Kebaikanmu memberikan harapan dan perawatan terbaik bagi kucing jalanan rescue.
          </p>

          <!-- Transaction Summary Box -->
          <div class="bg-[#F8F3EA] p-4 rounded-xl border border-[#E9E0D5] text-left text-xs space-y-2 mb-6">
            <div class="flex justify-between border-b border-[#E9E0D5] pb-2">
              <span class="text-[#77716B]">Program:</span>
              <span class="font-bold text-[#2D2926]">{{ lastDonation?.campaignName }}</span>
            </div>
            <div class="flex justify-between border-b border-[#E9E0D5] pb-2">
              <span class="text-[#77716B]">Nominal Donasi:</span>
              <span class="font-extrabold text-[#3D9B6D]">Rp {{ formatRupiah(lastDonation?.amount) }}</span>
            </div>
            <div class="flex justify-between border-b border-[#E9E0D5] pb-2">
              <span class="text-[#77716B]">Nama Donatur:</span>
              <span class="font-semibold text-[#2D2926]">{{ lastDonation?.donorName }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-[#77716B]">Metode Pembayaran:</span>
              <span class="font-semibold text-[#C96A29]">{{ lastDonation?.methodName }}</span>
            </div>
          </div>

          <div class="p-3 bg-amber-50 rounded-xl border border-amber-200 text-left text-[11px] text-amber-800 mb-6">
            ℹ️ <strong>Mode Portofolio Demo:</strong> Donasi ini disimulasikan secara lokal (localStorage). Tidak ada transaksi dana keuangan riil.
          </div>

          <div class="flex flex-col sm:flex-row gap-3">
            <button @click="goToHistory" class="btn btn-primary flex-1 py-2.5 text-xs font-bold">
              Lihat Riwayat Donasi
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
import { ref, computed, onMounted } from 'vue'
import { getDonations, saveDonation, getCurrentUser } from '@/utils/storage'

const activeTab = ref('form')

const campaigns = [
  { id: 1, icon: '🍲', name: 'Makanan Harian Kucing Jalanan', desc: 'Bantu stok pakan bernutrisi harian untuk kucing jalanan & shelter.', target: 'Rp 5.000.000' },
  { id: 2, icon: '🩺', name: 'Dana Pengobatan & Medis Darurat', desc: 'Cover biaya operasi, obat luka, dan vaksinasi kucing sakit.', target: 'Rp 10.000.000' },
  { id: 3, icon: '✂️', name: 'Program Sterilisasi Gratis', desc: 'Kendalikan populasi kucing liar secara etis & sehat.', target: 'Rp 7.500.000' },
  { id: 4, icon: '🏠', name: 'Fasilitas & Operasional Shelter', desc: 'Bantu ruang karantina dan selimut hangat kucing rescue.', target: 'Rp 15.000.000' }
]

const selectedCampaign = ref(campaigns[0])

const quickAmounts = [10000, 25000, 50000, 100000, 250000]
const selectedAmount = ref(50000)
const customAmount = ref(null)

const finalAmount = computed(() => customAmount.value || selectedAmount.value || 0)

const paymentMethods = [
  { id: 'qris', name: 'Demo QRIS', badge: 'QRIS' },
  { id: 'bca', name: 'Demo Transfer BCA', badge: 'BCA' },
  { id: 'gopay', name: 'Demo GoPay', badge: 'GPY' },
  { id: 'ovo', name: 'Demo OVO', badge: 'OVO' }
]
const selectedMethod = ref(paymentMethods[0])

const donorName = ref('')
const donorEmail = ref('')
const isAnonymous = ref(false)

const errors = ref({})
const amountError = ref('')
const donations = ref([])
const showSuccessModal = ref(false)
const lastDonation = ref(null)

const selectQuickAmount = (amount) => {
  selectedAmount.value = amount
  customAmount.value = null
  amountError.value = ''
}

const onCustomAmountInput = () => {
  if (customAmount.value && customAmount.value < 5000) {
    amountError.value = 'Nominal donasi minimal Rp 5.000'
  } else {
    amountError.value = ''
  }
}

const validateForm = () => {
  const newErrors = {}

  if (!isAnonymous.value && !donorName.value.trim()) {
    newErrors.donorName = 'Nama donatur wajib diisi.'
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!donorEmail.value.trim()) {
    newErrors.donorEmail = 'Alamat email wajib diisi.'
  } else if (!emailRegex.test(donorEmail.value.trim())) {
    newErrors.donorEmail = 'Format email tidak valid.'
  }

  if (!selectedMethod.value) {
    newErrors.method = 'Pilih salah satu kanal pembayaran demo.'
  }

  if (finalAmount.value < 5000) {
    amountError.value = 'Nominal donasi minimal Rp 5.000'
    newErrors.amount = true
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const formatRupiah = (val) => {
  if (!val) return '0'
  return val.toLocaleString('id-ID')
}

const isSubmitting = ref(false)

const handleDonate = () => {
  if (!validateForm() || isSubmitting.value) return

  isSubmitting.value = true

  setTimeout(() => {
    const donationData = {
      id: `DON-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      campaignName: selectedCampaign.value.name,
      amount: finalAmount.value,
      donorName: isAnonymous.value ? 'Hamba Allah (Anonim)' : donorName.value.trim(),
      donorEmail: donorEmail.value.trim(),
      methodName: selectedMethod.value.name,
      createdAt: new Date().toISOString()
    }

    saveDonation(donationData)
    lastDonation.value = donationData
    donations.value = getDonations()
    showSuccessModal.value = true
    isSubmitting.value = false
  }, 400)
}

const goToHistory = () => {
  showSuccessModal.value = false
  activeTab.value = 'history'
}

const formatDate = (isoString) => {
  if (!isoString) return ''
  const date = new Date(isoString)
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

onMounted(() => {
  const user = getCurrentUser()
  if (user) {
    donorName.value = user.name || ''
    donorEmail.value = user.email || ''
  }
  donations.value = getDonations()
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
