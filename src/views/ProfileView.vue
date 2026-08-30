<template>
  <main class="min-h-screen bg-[#F8F3EA] pt-24 pb-16">
    <div class="container-custom max-w-4xl">
      <!-- Profile Card Main Header -->
      <div class="card-custom bg-white p-6 sm:p-8 mb-8 relative overflow-hidden">
        <!-- Decor Cat -->
        <img
          :src="withBase('images/vector/kucingsetengah.PNG')"
          class="hidden sm:block absolute right-6 top-0 w-28 opacity-80 pointer-events-none"
          alt="Cat decoration"
        />

        <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <!-- Profile Picture Avatar -->
          <div class="relative flex-shrink-0">
            <img
              :src="withBase('images/home/Cat 9.jpg')"
              class="w-24 h-24 rounded-full border-4 border-[#FFF0E4] object-cover shadow-md"
              alt="Profile Picture"
            />
            <span class="absolute bottom-0 right-0 w-6 h-6 bg-[#3D9B6D] border-2 border-white rounded-full" title="Online Demo Session"></span>
          </div>

          <!-- User Info Summary -->
          <div class="space-y-2 text-center sm:text-left flex-grow">
            <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 class="text-2xl sm:text-3xl font-extrabold text-[#2D2926]">{{ user.name }}</h1>
              <span class="px-3 py-1 bg-[#FFF0E4] text-[#C96A29] text-xs font-bold rounded-full border border-[#E9E0D5]">
                Akun Demo Lokal
              </span>
            </div>

            <p class="text-xs text-[#77716B]">📧 {{ user.email }} • 📱 {{ user.phone }}</p>
            <p class="text-xs text-[#77716B]">👤 Username: <strong>{{ user.username }}</strong></p>

            <div class="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
              <button
                v-if="!isEditing"
                @click="startEdit"
                class="btn btn-outline px-4 py-1.5 text-xs font-bold"
              >
                ✏️ Edit Profil
              </button>
              <button
                @click="handleLogout"
                class="btn btn-danger px-4 py-1.5 text-xs font-bold"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>

        <!-- Edit Profile Form Section -->
        <div v-if="isEditing" class="mt-6 pt-6 border-t border-[#E9E0D5] bg-[#F8F3EA] p-4 sm:p-6 rounded-2xl">
          <h3 class="font-bold text-[#2D2926] text-sm mb-4">Edit Informasi Profil</h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-[#2D2926] uppercase mb-1">Nama Lengkap</label>
              <input v-model="tempUser.name" type="text" class="text-xs" />
            </div>

            <div>
              <label class="block text-xs font-bold text-[#2D2926] uppercase mb-1">Username</label>
              <input v-model="tempUser.username" type="text" class="text-xs" />
            </div>

            <div>
              <label class="block text-xs font-bold text-[#2D2926] uppercase mb-1">No. HP / WhatsApp</label>
              <input v-model="tempUser.phone" type="text" class="text-xs" />
            </div>

            <div>
              <label class="block text-xs font-bold text-[#2D2926] uppercase mb-1">Alamat Email (Tetap)</label>
              <input v-model="tempUser.email" type="text" disabled class="text-xs opacity-60 bg-gray-100 cursor-not-allowed" />
            </div>
          </div>

          <div class="flex gap-2 mt-4">
            <button @click="saveProfile" class="btn btn-primary px-5 py-2 text-xs font-bold">
              Simpan Perubahan
            </button>
            <button @click="cancelEdit" class="btn btn-outline px-5 py-2 text-xs font-bold">
              Batal
            </button>
          </div>
        </div>
      </div>

      <!-- Activity History Hub (Navigation Tabs) -->
      <div class="space-y-6">
        <div class="border-b border-[#E9E0D5] flex space-x-4 overflow-x-auto pb-1 hide-scrollbar">
          <button
            @click="activeTab = 'reports'"
            class="px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap cursor-pointer flex items-center gap-2"
            :class="activeTab === 'reports' ? 'border-[#E9823D] text-[#E9823D]' : 'border-transparent text-[#77716B] hover:text-[#2D2926]'"
          >
            <span>🚨 Riwayat Laporan Rescue</span>
            <span class="px-2 py-0.5 rounded-full text-[10px]" :class="activeTab === 'reports' ? 'bg-[#FFF0E4] text-[#C96A29]' : 'bg-gray-100 text-gray-600'">
              {{ reports.length }}
            </span>
          </button>

          <button
            @click="activeTab = 'donations'"
            class="px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap cursor-pointer flex items-center gap-2"
            :class="activeTab === 'donations' ? 'border-[#E9823D] text-[#E9823D]' : 'border-transparent text-[#77716B] hover:text-[#2D2926]'"
          >
            <span>❤️ Riwayat Donasi</span>
            <span class="px-2 py-0.5 rounded-full text-[10px]" :class="activeTab === 'donations' ? 'bg-[#FFF0E4] text-[#C96A29]' : 'bg-gray-100 text-gray-600'">
              {{ donations.length }}
            </span>
          </button>

          <button
            @click="activeTab = 'adoptions'"
            class="px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap cursor-pointer flex items-center gap-2"
            :class="activeTab === 'adoptions' ? 'border-[#E9823D] text-[#E9823D]' : 'border-transparent text-[#77716B] hover:text-[#2D2926]'"
          >
            <span>🐱 Pengajuan Adopsi</span>
            <span class="px-2 py-0.5 rounded-full text-[10px]" :class="activeTab === 'adoptions' ? 'bg-[#FFF0E4] text-[#C96A29]' : 'bg-gray-100 text-gray-600'">
              {{ adoptions.length }}
            </span>
          </button>
        </div>

        <!-- TAB CONTENT: REPORTS -->
        <div v-if="activeTab === 'reports'" class="space-y-4">
          <div v-if="reports.length > 0" class="space-y-4">
            <div
              v-for="rep in reports"
              :key="rep.id"
              class="card-custom bg-white p-5 flex flex-col sm:flex-row justify-between items-start gap-4"
            >
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="font-mono text-xs font-bold px-2 py-0.5 bg-[#FFF0E4] text-[#C96A29] rounded-md">
                    {{ rep.id }}
                  </span>
                  <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    {{ rep.status }}
                  </span>
                </div>
                <h4 class="font-bold text-[#2D2926] text-base">{{ rep.tempName ? rep.tempName : 'Laporan Rescue' }} — {{ rep.condition }}</h4>
                <p class="text-xs text-[#77716B]">📍 {{ rep.location }}</p>
                <p class="text-xs text-[#77716B]">🕒 {{ formatDate(rep.createdAt) }}</p>
                <p class="text-xs text-[#77716B] line-clamp-2 mt-1">"{{ rep.description }}"</p>
              </div>

              <router-link to="/report-rescue" class="btn btn-outline px-4 py-2 text-xs font-bold flex-shrink-0">
                Kelola Laporan &rarr;
              </router-link>
            </div>
          </div>

          <div v-else class="card-custom bg-white p-10 text-center max-w-md mx-auto">
            <div class="text-4xl mb-3">🚨</div>
            <h3 class="text-base font-bold text-[#2D2926] mb-1">Belum Ada Riwayat Laporan</h3>
            <p class="text-xs text-[#77716B] mb-5">Anda belum pernah membuat laporan penanganan kucing jalanan.</p>
            <router-link to="/report-rescue" class="btn btn-primary px-5 py-2 text-xs font-bold">
              Buat Laporan Rescue
            </router-link>
          </div>
        </div>

        <!-- TAB CONTENT: DONATIONS -->
        <div v-else-if="activeTab === 'donations'" class="space-y-4">
          <div v-if="donations.length > 0" class="space-y-4">
            <div
              v-for="don in donations"
              :key="don.id"
              class="card-custom bg-white p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-xl bg-[#FFF0E4] text-[#E9823D] flex items-center justify-center text-xl flex-shrink-0">
                  ❤️
                </div>
                <div>
                  <h4 class="font-bold text-[#2D2926] text-sm sm:text-base">{{ don.campaignName }}</h4>
                  <p class="text-xs text-[#77716B]">{{ formatDate(don.createdAt) }} • {{ don.methodName }}</p>
                </div>
              </div>

              <div class="text-right w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-[#E9E0D5]">
                <p class="text-base font-extrabold text-[#3D9B6D]">Rp {{ formatRupiah(don.amount) }}</p>
                <span class="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Simulasi Berhasil
                </span>
              </div>
            </div>
          </div>

          <div v-else class="card-custom bg-white p-10 text-center max-w-md mx-auto">
            <div class="text-4xl mb-3">❤️</div>
            <h3 class="text-base font-bold text-[#2D2926] mb-1">Belum Ada Riwayat Donasi</h3>
            <p class="text-xs text-[#77716B] mb-5">Dukungan kecilmu membantu memberikan perawatan bagi kucing jalanan.</p>
            <router-link to="/donate" class="btn btn-primary px-5 py-2 text-xs font-bold">
              Salurkan Donasi
            </router-link>
          </div>
        </div>

        <!-- TAB CONTENT: ADOPTIONS -->
        <div v-else-if="activeTab === 'adoptions'" class="space-y-4">
          <div v-if="adoptions.length > 0" class="space-y-4">
            <div
              v-for="(ado, index) in adoptions"
              :key="index"
              class="card-custom bg-white p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-xl bg-[#FFF0E4] text-[#E9823D] flex items-center justify-center text-xl flex-shrink-0">
                  🐱
                </div>
                <div>
                  <h4 class="font-bold text-[#2D2926] text-sm sm:text-base">Pengajuan Adopsi: {{ ado.catName }}</h4>
                  <p class="text-xs text-[#77716B]">Pemohon: {{ ado.applicant?.name }} • {{ formatDate(ado.submittedAt) }}</p>
                </div>
              </div>

              <div class="text-right w-full sm:w-auto">
                <span class="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">
                  Dalam Peninjauan Demo
                </span>
              </div>
            </div>
          </div>

          <div v-else class="card-custom bg-white p-10 text-center max-w-md mx-auto">
            <div class="text-4xl mb-3">🐱</div>
            <h3 class="text-base font-bold text-[#2D2926] mb-1">Belum Ada Pengajuan Adopsi</h3>
            <p class="text-xs text-[#77716B] mb-5">Anda belum mengajukan permohonan adopsi kucing.</p>
            <router-link to="/adoption" class="btn btn-primary px-5 py-2 text-xs font-bold">
              Cari Kucing Adopsi
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { withBase } from '@/utils/paths'
import { getCurrentUser, setCurrentUser, logoutUser, getReports, getDonations, getAdoptions } from '@/utils/storage'

const router = useRouter()

const user = ref({
  name: 'Ervina Kusnanda',
  username: 'ERVII',
  email: 'ervina@adopkucing.com',
  phone: '08220000118'
})

const isEditing = ref(false)
const tempUser = ref({})
const activeTab = ref('reports')

const reports = ref([])
const donations = ref([])
const adoptions = ref([])

onMounted(() => {
  const currentUser = getCurrentUser()
  if (currentUser) {
    user.value = { ...currentUser }
  } else {
    // default profile state
    user.value = {
      name: 'Ervina Kusnanda',
      username: 'ERVII',
      email: 'ervina@adopkucing.com',
      phone: '08220000118'
    }
    setCurrentUser(user.value)
  }

  reports.value = getReports()
  donations.value = getDonations()
  adoptions.value = getAdoptions()
})

const startEdit = () => {
  tempUser.value = { ...user.value }
  isEditing.value = true
}

const saveProfile = () => {
  user.value = { ...tempUser.value }
  setCurrentUser(user.value)
  isEditing.value = false
}

const cancelEdit = () => {
  isEditing.value = false
}

const handleLogout = () => {
  logoutUser()
  router.push('/')
}

const formatRupiah = (val) => {
  if (!val) return '0'
  return val.toLocaleString('id-ID')
}

const formatDate = (isoString) => {
  if (!isoString) return ''
  const date = new Date(isoString)
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
