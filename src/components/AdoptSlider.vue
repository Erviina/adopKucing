<template>
  <section class="py-16 bg-[#F8F3EA] border-t border-[#E9E0D5]">
    <div class="container-custom max-w-6xl">
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto mb-10">
        <div class="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FFF0E4] border border-[#E9E0D5] rounded-full text-[#C96A29] text-xs font-semibold uppercase tracking-wider mb-2">
          🐱 Katalog Pilihan
        </div>
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2D2926] mb-2">
          Kucing Siap Adopsi 🐱
        </h2>
        <p class="text-[#77716B] text-sm sm:text-base">
          Geser dan temukan kucing impianmu yang siap diadopsi hari ini.
        </p>
      </div>

      <!-- Swiper Slider -->
      <Swiper
        :modules="[Navigation, Pagination, Autoplay]"
        :slides-per-view="1"
        :space-between="20"
        :breakpoints="{
          640: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 24 }
        }"
        :autoplay="{ delay: 4000, disableOnInteraction: false }"
        navigation
        pagination
        class="mySwiper !pb-12"
      >
        <SwiperSlide
          v-for="kitten in kittens"
          :key="kitten.id"
          class="h-auto"
        >
          <div
            class="card-custom bg-white overflow-hidden flex flex-col justify-between h-full border border-[#E9E0D5] hover:shadow-lg transition-all duration-300 group cursor-pointer"
            @click="goToAdoptDetailById(kitten.id)"
          >
            <!-- Photo & Status Badge -->
            <div class="relative h-56 w-full overflow-hidden bg-gray-100 flex-shrink-0">
              <img
                :src="kitten.imageUrl"
                :alt="kitten.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span
                class="absolute top-3 left-3 px-3 py-1 text-xs font-bold rounded-full shadow-sm"
                :class="getStatusBadgeClass(kitten.status)"
              >
                {{ getStatusBadgeText(kitten.status) }}
              </span>
            </div>

            <!-- Card Content -->
            <div class="p-5 flex flex-col justify-between flex-grow space-y-3">
              <div>
                <p class="text-xs font-bold text-[#77716B] uppercase tracking-wider flex items-center gap-1 mb-1">
                  <span>📍</span> {{ kitten.location.toUpperCase() }}
                </p>

                <h3 class="text-xl font-extrabold text-[#2D2926] group-hover:text-[#E9823D] transition">
                  {{ kitten.name }}
                </h3>

                <p class="text-xs font-semibold text-[#77716B] mt-1">
                  🐱 {{ kitten.age }} • {{ kitten.gender === 'Jantan' ? '♂ Jantan' : '♀ Betina' }}
                </p>
              </div>

              <!-- Button CTA -->
              <div class="pt-3 border-t border-[#E9E0D5]/60">
                <button
                  type="button"
                  @click.stop="goToAdoptDetailById(kitten.id)"
                  class="btn btn-outline w-full py-2.5 text-xs font-bold group-hover:bg-[#E9823D] group-hover:text-white group-hover:border-[#E9823D] transition flex items-center justify-center gap-1.5"
                >
                  <span>Lihat Detail</span>
                  <span>&rarr;</span>
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <!-- Bottom Action -->
      <div class="text-center mt-6">
        <RouterLink
          to="/adoption"
          class="btn btn-primary px-8 py-3.5 rounded-xl text-sm sm:text-base font-bold shadow-md hover:shadow-lg inline-flex items-center gap-2 transition"
        >
          <span>Lihat Semua Kucing Adopsi</span>
          <span>&rarr;</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import catsData from '@/data/cats'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const router = useRouter()
const kittens = ref(catsData)

const goToAdoptDetailById = (id) => {
  router.push(`/adopt-now/${id}`)
}

const getStatusBadgeClass = (status) => {
  if (status === 'Tersedia') return 'bg-[#3D9B6D] text-white'
  if (status === 'Proses Adopsi') return 'bg-[#D99A2B] text-white'
  return 'bg-[#15B2D5] text-white'
}

const getStatusBadgeText = (status) => {
  if (status === 'Tersedia') return '🟢 Tersedia'
  if (status === 'Proses Adopsi') return '🟡 Proses Adopsi'
  return '🔵 Dalam Perawatan'
}
</script>

<style scoped>
.mySwiper {
  width: 100%;
}
</style>
