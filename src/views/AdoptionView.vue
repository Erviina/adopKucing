<template>
  <main class="min-h-screen bg-[#F8F3EA] pt-24 pb-16">
    <div class="container-custom">
      <!-- Page Header -->
      <div class="max-w-3xl mb-8">
        <div class="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF0E4] border border-[#E9E0D5] rounded-full text-[#C96A29] text-xs font-semibold uppercase tracking-wider mb-3">
          🐱 Katalog Adopsi Resmi
        </div>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-[#2D2926] mb-3">
          Temukan Sahabat Barumu 🐾
        </h1>
        <p class="text-[#77716B] text-base sm:text-lg">
          Jelajahi kucing jalanan yang telah mendapatkan perawatan medis dan siap menyambut keluarga serta rumah baru.
        </p>
      </div>

      <!-- Filter & Search Bar Card -->
      <div class="card-custom p-4 sm:p-6 mb-10 bg-white">
        <div class="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          <!-- Search Bar -->
          <div class="relative flex-grow">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari nama, ras, deskripsi, atau lokasi..."
              class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E9E0D5] text-sm focus:outline-none focus:ring-2 focus:ring-[#E9823D]/20 focus:border-[#E9823D]"
            />
            <svg
              class="w-5 h-5 text-[#77716B] absolute left-3 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <!-- Dropdown Filters -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <select
              v-model="selectedBreed"
              class="py-2.5 px-3 rounded-xl border border-[#E9E0D5] text-xs sm:text-sm bg-white text-[#2D2926] focus:outline-none focus:border-[#E9823D]"
            >
              <option v-for="breed in breeds" :key="breed" :value="breed">{{ breed }}</option>
            </select>

            <select
              v-model="selectedLocation"
              class="py-2.5 px-3 rounded-xl border border-[#E9E0D5] text-xs sm:text-sm bg-white text-[#2D2926] focus:outline-none focus:border-[#E9823D]"
            >
              <option v-for="location in locations" :key="location" :value="location">{{ location }}</option>
            </select>

            <select
              v-model="selectedGender"
              class="py-2.5 px-3 rounded-xl border border-[#E9E0D5] text-xs sm:text-sm bg-white text-[#2D2926] focus:outline-none focus:border-[#E9823D]"
            >
              <option value="Semua Gender">Semua Gender</option>
              <option value="Jantan">Jantan ♂</option>
              <option value="Betina">Betina ♀</option>
            </select>

            <select
              v-model="selectedStatus"
              class="py-2.5 px-3 rounded-xl border border-[#E9E0D5] text-xs sm:text-sm bg-white text-[#2D2926] focus:outline-none focus:border-[#E9823D]"
            >
              <option value="Semua Status">Semua Status</option>
              <option value="Tersedia">Tersedia</option>
              <option value="Proses Adopsi">Proses Adopsi</option>
              <option value="Dalam Perawatan">Dalam Perawatan</option>
            </select>
          </div>

          <!-- Favorites Drawer Toggle Button -->
          <div class="relative flex items-center justify-end">
            <button
              @click.stop="toggleFavoritesTooltip"
              class="px-4 py-2.5 bg-[#FFF0E4] border border-[#E9E0D5] hover:border-[#E9823D] rounded-xl flex items-center gap-2 text-[#C96A29] font-medium text-sm transition"
              title="Lihat Kucing Favorit"
            >
              <svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>Favorit</span>
              <span
                v-if="favorites.length > 0"
                class="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5"
              >
                {{ favorites.length }}
              </span>
            </button>

            <!-- Tooltip / Drawer Kucing Favorit -->
            <transition name="fade-slide">
              <div
                v-if="showFavoritesTooltip"
                class="absolute right-0 top-full mt-2 w-72 max-h-80 overflow-y-auto bg-white rounded-2xl shadow-xl p-4 z-30 border border-[#E9E0D5]"
              >
                <div class="flex items-center justify-between border-b border-[#E9E0D5] pb-2 mb-3">
                  <h3 class="font-bold text-[#2D2926] text-sm">Kucing Favorit Saya</h3>
                  <span class="text-xs text-[#77716B]">{{ favorites.length }} disimpan</span>
                </div>

                <div v-if="favorites.length > 0" class="space-y-2.5">
                  <div
                    v-for="cat in favorites"
                    :key="'fav-' + cat.id"
                    class="flex items-center justify-between p-2 rounded-xl hover:bg-[#FFF0E4]/60 transition"
                  >
                    <div class="flex items-center space-x-3 cursor-pointer" @click="$router.push('/adopt-now/' + cat.id)">
                      <img
                        :src="cat.imageUrl"
                        class="w-10 h-10 object-cover rounded-lg border border-[#E9E0D5]"
                        :alt="cat.name"
                      />
                      <div>
                        <p class="text-[#2D2926] font-semibold text-sm leading-tight">{{ cat.name }}</p>
                        <p class="text-xs text-[#77716B]">{{ cat.breed }} • {{ cat.location }}</p>
                      </div>
                    </div>
                    <button
                      @click="toggleFavorite(cat)"
                      class="text-red-500 hover:text-red-700 p-1 text-sm font-bold"
                      title="Hapus dari Favorit"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <p v-else class="text-[#77716B] text-xs italic text-center py-4">
                  Belum ada kucing favorit yang disimpan.
                </p>
              </div>
            </transition>
          </div>
        </div>
      </div>

      <!-- Cat Cards Grid -->
      <div v-if="filteredCats.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="cat in filteredCats"
          :key="cat.id"
          class="card-custom flex flex-col justify-between group"
        >
          <div>
            <!-- Image & Status Overlay -->
            <div class="relative h-56 w-full overflow-hidden bg-gray-100">
              <img
                :src="cat.imageUrl"
                :alt="cat.name"
                class="object-cover w-full h-full group-hover:scale-105 transition duration-500"
              />
              <span
                class="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full shadow-sm"
                :class="getStatusBadgeClass(cat.status)"
              >
                {{ cat.status }}
              </span>

              <!-- Favorite Heart Button -->
              <button
                @click.stop="toggleFavorite(cat)"
                class="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-gray-400 shadow-md transition"
                :title="isFavorite(cat.id) ? 'Hapus dari Favorit' : 'Tambah ke Favorit'"
              >
                <svg
                  class="w-5 h-5 transition-colors"
                  :class="isFavorite(cat.id) ? 'text-red-500 fill-current' : 'text-gray-400'"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>

            <!-- Content Details -->
            <div class="p-5">
              <div class="flex items-center justify-between mb-2">
                <h2 class="text-xl font-bold text-[#2D2926]">{{ cat.name }}</h2>
                <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#FFF0E4] text-[#C96A29]">
                  {{ cat.gender === 'Jantan' ? 'Jantan ♂' : 'Betina ♀' }}
                </span>
              </div>

              <div class="flex flex-wrap gap-y-1 gap-x-3 text-xs text-[#77716B] font-medium mb-3">
                <span>⏰ {{ cat.age }}</span>
                <span>🐱 {{ cat.breed }}</span>
                <span>📍 {{ cat.location }}</span>
              </div>

              <p class="text-[#77716B] text-sm leading-relaxed mb-4 line-clamp-3">
                {{ cat.description }}
              </p>
            </div>
          </div>

          <div class="px-5 pb-5 pt-0">
            <button
              @click="$router.push('/adopt-now/' + cat.id)"
              class="btn btn-primary w-full text-center py-2.5 text-sm"
            >
              Lihat Detail & Adopsi
            </button>
          </div>
        </div>
      </div>

      <!-- Friendly Empty State -->
      <div v-else class="card-custom p-12 text-center max-w-lg mx-auto bg-white my-8">
        <div class="text-5xl mb-4">🐾 😿</div>
        <h3 class="text-xl font-bold text-[#2D2926] mb-2">Kucing Tidak Ditemukan</h3>
        <p class="text-[#77716B] text-sm leading-relaxed mb-6">
          Tidak ada kucing yang sesuai dengan kriteria kata kunci atau filter pencarianmu saat ini. Coba sesuaikan filter kembali.
        </p>
        <button
          @click="resetFilters"
          class="btn btn-primary px-6 py-2.5 text-sm"
        >
          Reset Filter Pencarian
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import catsData from "@/data/cats"

const searchQuery = ref("")
const selectedBreed = ref("Semua Ras")
const selectedLocation = ref("Semua Lokasi")
const selectedGender = ref("Semua Gender")
const selectedStatus = ref("Semua Status")

const showFavoritesTooltip = ref(false)
const favoriteIds = ref([])

const cats = ref(catsData)

const breeds = computed(() => {
  const allBreeds = cats.value.map((cat) => cat.breed)
  return ["Semua Ras", ...new Set(allBreeds)]
})

const locations = computed(() => {
  const allLocations = cats.value.map((cat) => cat.location)
  return ["Semua Lokasi", ...new Set(allLocations)]
})

const filteredCats = computed(() =>
  cats.value.filter((cat) => {
    const query = searchQuery.value.toLowerCase().trim()
    const matchesQuery =
      !query ||
      cat.name.toLowerCase().includes(query) ||
      cat.breed.toLowerCase().includes(query) ||
      cat.location.toLowerCase().includes(query) ||
      cat.description.toLowerCase().includes(query)

    const matchesBreed = selectedBreed.value === "Semua Ras" || cat.breed === selectedBreed.value
    const matchesLocation = selectedLocation.value === "Semua Lokasi" || cat.location === selectedLocation.value
    const matchesGender = selectedGender.value === "Semua Gender" || cat.gender === selectedGender.value
    const matchesStatus = selectedStatus.value === "Semua Status" || cat.status === selectedStatus.value

    return matchesQuery && matchesBreed && matchesLocation && matchesGender && matchesStatus
  })
)

const favorites = computed(() => {
  return cats.value.filter((cat) => favoriteIds.value.includes(cat.id))
})

const isFavorite = (catId) => favoriteIds.value.includes(catId)

const toggleFavorite = (cat) => {
  const index = favoriteIds.value.indexOf(cat.id)
  if (index > -1) {
    favoriteIds.value.splice(index, 1)
  } else {
    favoriteIds.value.push(cat.id)
  }
  localStorage.setItem("favorite_cat_ids", JSON.stringify(favoriteIds.value))
}

const toggleFavoritesTooltip = () => {
  showFavoritesTooltip.value = !showFavoritesTooltip.value
}

const resetFilters = () => {
  searchQuery.value = ""
  selectedBreed.value = "Semua Ras"
  selectedLocation.value = "Semua Lokasi"
  selectedGender.value = "Semua Gender"
  selectedStatus.value = "Semua Status"
}

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

onMounted(() => {
  const storedFavs = localStorage.getItem("favorite_cat_ids")
  if (storedFavs) {
    try {
      favoriteIds.value = JSON.parse(storedFavs)
    } catch (e) {
      favoriteIds.value = []
    }
  }
})
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.25s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
