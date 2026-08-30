<template>
  <section class="py-16 bg-[#F8F3EA] border-t border-[#E9E0D5]">
    <div class="container-custom max-w-6xl">
      <!-- Container 2 Kolom Utama -->
      <div class="card-custom bg-white p-6 sm:p-10 lg:p-12 overflow-hidden relative shadow-md">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          <!-- Kolom Kiri: Informasi & CTA -->
          <div class="lg:col-span-7 space-y-5 text-center lg:text-left z-10">
            <div class="inline-flex items-center gap-2 px-3.5 py-1 bg-red-100 border border-red-200 rounded-full text-red-700 text-xs font-bold uppercase tracking-wider">
              🚨 Penyelamatan & Laporan Darurat
            </div>

            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2D2926] leading-tight">
              Temukan Kucing Liar yang <span class="text-red-600">Butuh Bantuan?</span>
            </h2>

            <p class="text-[#77716B] text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
              Laporkan lokasi kucing jalanan yang terluka, sakit, atau membutuhkan pertolongan medis darurat agar tim relawan rescue kami dapat segera meluncur ke lokasi.
            </p>

            <div class="pt-2 flex justify-center lg:justify-start">
              <RouterLink
                to="/report-rescue"
                class="btn btn-danger px-8 py-3.5 text-base font-bold shadow-lg hover:shadow-xl inline-flex items-center gap-2.5 rounded-xl transition duration-300 transform hover:-translate-y-0.5"
              >
                <span>🚨</span> Laporkan Kucing Sekarang
              </RouterLink>
            </div>
          </div>

          <!-- Kolom Kanan: Foto Kucing Rescue ber-Frame Rapi -->
          <div class="lg:col-span-5 relative flex justify-center">
            <div class="relative w-full max-w-md lg:max-w-none">
              <!-- Soft ambient backdrop glow -->
              <div class="absolute -inset-2 bg-gradient-to-tr from-[#FFF0E4] to-red-100 rounded-3xl transform rotate-2 opacity-80 pointer-events-none"></div>
              
              <div class="relative rounded-2xl overflow-hidden border-2 border-[#E9E0D5] shadow-md bg-white group">
                <img
                  :src="withBase('images/home/Cat 9.jpg')"
                  alt="Kucing Rescue AdopKucing"
                  class="w-full h-64 sm:h-72 lg:h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div class="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-[#E9E0D5] flex items-center justify-between text-xs font-bold text-[#2D2926] shadow-sm">
                  <span class="flex items-center gap-1.5">
                    <span>🚑</span> Tim Rescue Siaga
                  </span>
                  <span class="text-emerald-600 font-semibold text-[11px] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    ● Bebas Biaya
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { withBase } from '@/utils/paths'
</script>

<style scoped></style>
