<template>
  <div>
    <!-- Hero Section -->
    <section id="hero-area" class="relative bg-[#F8F3EA] pt-24 pb-12 overflow-hidden">
      <div class="container-custom max-w-7xl">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[82vh] lg:min-h-0 lg:py-16">

          <!-- LEFT: Text Content -->
          <div class="flex flex-col justify-center space-y-6 text-center lg:text-left order-2 lg:order-1 pb-8 lg:pb-0">
            <!-- Badge -->
            <div class="flex justify-center lg:justify-start">
              <span class="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFF0E4] border border-[#E9E0D5] rounded-full text-[#C96A29] text-xs font-bold uppercase tracking-wider">
                🐾 Platform Penyelamatan & Adopsi Kucing
              </span>
            </div>

            <!-- Heading -->
            <h1 class="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-[#2D2926] leading-[1.18]">
              Beri Kucing Jalanan<br>
              Rumah &amp;<br>
              <span class="text-[#E9823D]">Kesempatan Kedua</span>
            </h1>

            <!-- Description -->
            <p class="text-[#77716B] text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
              AdopKucing membantu kucing terlantar mendapatkan kesempatan untuk pulih dan menemukan keluarga yang penuh kasih sayang.
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start pt-2">
              <router-link
                to="/adoption"
                class="btn btn-primary px-7 py-3 text-sm sm:text-base font-bold shadow-md hover:shadow-lg rounded-xl"
              >
                Cari Kucing Adopsi 🐱
              </router-link>
              <router-link
                to="/report-rescue"
                class="btn btn-outline px-7 py-3 text-sm sm:text-base font-bold rounded-xl"
              >
                Laporkan Kucing 🚨
              </router-link>
            </div>

            <!-- Trust indicators -->
            <div class="flex items-center gap-5 justify-center lg:justify-start pt-2">
              <div class="flex items-center gap-1.5 text-xs font-semibold text-[#77716B]">
                <span class="text-[#3D9B6D]">✓</span> 150+ Kucing Diselamatkan
              </div>
              <div class="flex items-center gap-1.5 text-xs font-semibold text-[#77716B]">
                <span class="text-[#3D9B6D]">✓</span> 100% Gratis
              </div>
              <div class="flex items-center gap-1.5 text-xs font-semibold text-[#77716B]">
                <span class="text-[#3D9B6D]">✓</span> 35+ Relawan
              </div>
            </div>
          </div>

          <!-- RIGHT: Cat Visual -->
          <div class="relative flex items-center justify-center order-1 lg:order-2">
            <!-- Organic blob background -->
            <div class="hero-blob absolute inset-0 m-auto w-[85%] h-[85%] pointer-events-none"></div>

            <!-- Decorative paw dots (top-left) -->
            <div class="absolute top-4 left-4 text-[#B8E0F7] text-sm select-none pointer-events-none hidden lg:block">
              🐾
            </div>
            <!-- Decorative dots (bottom-right) -->
            <div class="absolute bottom-6 right-2 flex gap-1.5 pointer-events-none hidden lg:flex">
              <span class="w-2 h-2 rounded-full bg-[#E9823D]/30"></span>
              <span class="w-2 h-2 rounded-full bg-[#E9823D]/50"></span>
              <span class="w-2 h-2 rounded-full bg-[#E9823D]/70"></span>
            </div>

            <!-- Cat Image -->
            <div class="relative z-10 flex items-end justify-center w-full max-w-sm sm:max-w-md lg:max-w-lg">
              <img
                :src="withBase('images/home/hero-image.jpg')"
                alt="Kucing AdopKucing siap diadopsi"
                class="hero-cat-img w-full object-contain object-bottom drop-shadow-xl"
              />
            </div>

            <!-- Floating badge - atas -->
            <div class="absolute top-10 right-4 lg:right-0 bg-white shadow-md border border-[#E9E0D5] px-4 py-2 rounded-2xl text-xs font-bold text-[#2D2926] flex items-center gap-2 z-20 animate-float">
              <span class="text-[#3D9B6D]">🏠</span>
              <span>Butuh Rumah</span>
            </div>
            <!-- Floating badge - bawah -->
            <div class="absolute bottom-14 left-2 lg:-left-2 bg-white shadow-md border border-[#E9E0D5] px-4 py-2 rounded-2xl text-xs font-bold text-[#2D2926] flex items-center gap-2 z-20 animate-float-delayed">
              <span>❤️</span>
              <span>Sudah Divaksin</span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- Services / Fitur Utama Section -->
    <section class="py-16 bg-white border-y border-[#E9E0D5]">
      <div class="container-custom">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold text-[#2D2926] mb-3">Layanan & Fitur Utama</h2>
          <p class="text-[#77716B] text-sm sm:text-base">
            Satu tempat untuk penanganan, adopsi, dan bantuan penyelamatan kucing jalanan.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="card-custom p-6 flex flex-col justify-between hover:-translate-y-1 transition duration-300">
            <div>
              <div class="w-12 h-12 rounded-xl bg-[#FFF0E4] text-[#E9823D] flex items-center justify-center text-2xl mb-4">
                🐱
              </div>
              <h3 class="text-lg font-bold text-[#2D2926] mb-2">Adopsi Kucing</h3>
              <p class="text-sm text-[#77716B] leading-relaxed mb-4">
                Jelajahi kucing rescue yang telah divaksin dan steril, siap menyambut keluarga baru.
              </p>
            </div>
            <router-link to="/adoption" class="text-sm font-semibold text-[#E9823D] hover:text-[#C96A29] inline-flex items-center gap-1">
              Lihat Katalog &rarr;
            </router-link>
          </div>

          <div class="card-custom p-6 flex flex-col justify-between hover:-translate-y-1 transition duration-300">
            <div>
              <div class="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center text-2xl mb-4">
                🚨
              </div>
              <h3 class="text-lg font-bold text-[#2D2926] mb-2">Report & Rescue</h3>
              <p class="text-sm text-[#77716B] leading-relaxed mb-4">
                Temukan kucing jalanan yang terluka atau butuh bantuan? Laporkan lokasi secara mudah.
              </p>
            </div>
            <router-link to="/report-rescue" class="text-sm font-semibold text-red-600 hover:text-red-700 inline-flex items-center gap-1">
              Buat Laporan &rarr;
            </router-link>
          </div>

          <div class="card-custom p-6 flex flex-col justify-between hover:-translate-y-1 transition duration-300">
            <div>
              <div class="w-12 h-12 rounded-xl bg-emerald-50 text-[#3D9B6D] flex items-center justify-center text-2xl mb-4">
                ❤️
              </div>
              <h3 class="text-lg font-bold text-[#2D2926] mb-2">Donasi Kasih</h3>
              <p class="text-sm text-[#77716B] leading-relaxed mb-4">
                Bantu biaya obat, makanan berkarbohidrat tinggi, dan sterilisasi gratis untuk kucing rescue.
              </p>
            </div>
            <router-link to="/donate" class="text-sm font-semibold text-[#3D9B6D] hover:text-emerald-700 inline-flex items-center gap-1">
              Salurkan Donasi &rarr;
            </router-link>
          </div>

          <div class="card-custom p-6 flex flex-col justify-between hover:-translate-y-1 transition duration-300">
            <div>
              <div class="w-12 h-12 rounded-xl bg-amber-50 text-[#D99A2B] flex items-center justify-center text-2xl mb-4">
                📰
              </div>
              <h3 class="text-lg font-bold text-[#2D2926] mb-2">Berita & Komunitas</h3>
              <p class="text-sm text-[#77716B] leading-relaxed mb-4">
                Dapatkan kabar terkini, cerita penyelamatan, serta edukasi seputar perawatan kucing.
              </p>
            </div>
            <router-link to="/news" class="text-sm font-semibold text-[#D99A2B] hover:text-amber-700 inline-flex items-center gap-1">
              Baca Berita &rarr;
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Cats Slider -->
    <AdoptSlider />

    <!-- How It Works Section -->
    <section class="py-16 bg-white border-t border-[#E9E0D5]">
      <div class="container-custom">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold text-[#2D2926] mb-3">Cara Mengadopsi Kucing</h2>
          <p class="text-[#77716B] text-sm sm:text-base">
            Proses adopsi yang transparan dan aman untuk kebaikan kucing dan calon adopter.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          <div class="text-center p-5 bg-[#F8F3EA] rounded-2xl border border-[#E9E0D5]">
            <div class="w-10 h-10 rounded-full bg-[#E9823D] text-white font-bold flex items-center justify-center mx-auto mb-3 shadow-sm">
              1
            </div>
            <h3 class="font-bold text-[#2D2926] mb-1">Pilih Kucing</h3>
            <p class="text-xs text-[#77716B]">Cari kucing di katalog adopsi yang sesuai dengan kriteria dan hunianmu.</p>
          </div>

          <div class="text-center p-5 bg-[#F8F3EA] rounded-2xl border border-[#E9E0D5]">
            <div class="w-10 h-10 rounded-full bg-[#E9823D] text-white font-bold flex items-center justify-center mx-auto mb-3 shadow-sm">
              2
            </div>
            <h3 class="font-bold text-[#2D2926] mb-1">Isi Formulir</h3>
            <p class="text-xs text-[#77716B]">Lengkapi formulir permohonan adopsi online untuk mendaftarkan datamu.</p>
          </div>

          <div class="text-center p-5 bg-[#F8F3EA] rounded-2xl border border-[#E9E0D5]">
            <div class="w-10 h-10 rounded-full bg-[#E9823D] text-white font-bold flex items-center justify-center mx-auto mb-3 shadow-sm">
              3
            </div>
            <h3 class="font-bold text-[#2D2926] mb-1">Konfirmasi & Wawancara</h3>
            <p class="text-xs text-[#77716B]">Tim relawan mengonfirmasi kesiapan tempat tinggal dan perizinan.</p>
          </div>

          <div class="text-center p-5 bg-[#F8F3EA] rounded-2xl border border-[#E9E0D5]">
            <div class="w-10 h-10 rounded-full bg-[#E9823D] text-white font-bold flex items-center justify-center mx-auto mb-3 shadow-sm">
              4
            </div>
            <h3 class="font-bold text-[#2D2926] mb-1">Bawa Pulang</h3>
            <p class="text-xs text-[#77716B]">Sambut sahabat baru di rumahmu dengan aman dan penuh perhatian.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Impact & Statistics -->
    <section class="py-14 bg-[#FFF0E4] border-t border-[#E9E0D5]">
      <div class="container-custom">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div class="p-4">
            <p class="text-3xl sm:text-4xl font-extrabold text-[#E9823D] mb-1">150+</p>
            <p class="text-xs sm:text-sm font-semibold text-[#77716B]">Kucing Diselamatkan</p>
          </div>
          <div class="p-4">
            <p class="text-3xl sm:text-4xl font-extrabold text-[#E9823D] mb-1">120+</p>
            <p class="text-xs sm:text-sm font-semibold text-[#77716B]">Kucing Diadopsi</p>
          </div>
          <div class="p-4">
            <p class="text-3xl sm:text-4xl font-extrabold text-[#E9823D] mb-1">35+</p>
            <p class="text-xs sm:text-sm font-semibold text-[#77716B]">Relawan Aktif</p>
          </div>
          <div class="p-4">
            <p class="text-3xl sm:text-4xl font-extrabold text-[#E9823D] mb-1">100%</p>
            <p class="text-xs sm:text-sm font-semibold text-[#77716B]">Bebas Biaya Adopsi</p>
          </div>
        </div>
      </div>
    </section>

    <ReportKitten />
    <NewsSection />
    <FAQ />
    <AboutUs />
    <ContactUs />
  </div>
</template>

<script setup>
import AdoptSlider from '@/components/AdoptSlider.vue' 
import NewsSection from '@/components/NewsSection.vue'
import ReportKitten from '@/components/ReportKitten.vue'
import FAQ from '@/components/FAQ.vue'
import ContactUs from '@/components/ContactUs.vue'
import AboutUs from '@/components/AboutUs.vue'
import { withBase } from '@/utils/paths'
</script>

<style scoped>
/* ===== HERO BLOB SHAPE ===== */
.hero-blob {
  background: radial-gradient(ellipse at 55% 45%, #A8D8EA 0%, #B8E0F7 30%, #D6EEFF 60%, transparent 80%);
  border-radius: 60% 40% 55% 45% / 50% 60% 40% 50%;
  animation: blobMorph 8s ease-in-out infinite;
  filter: blur(2px);
  opacity: 0.85;
}

@keyframes blobMorph {
  0%   { border-radius: 60% 40% 55% 45% / 50% 60% 40% 50%; }
  33%  { border-radius: 50% 50% 45% 55% / 55% 45% 55% 45%; }
  66%  { border-radius: 45% 55% 60% 40% / 45% 55% 45% 55%; }
  100% { border-radius: 60% 40% 55% 45% / 50% 60% 40% 50%; }
}

/* ===== CAT IMAGE ===== */
.hero-cat-img {
  max-height: 480px;
  filter: drop-shadow(0 16px 32px rgba(0, 0, 0, 0.12));
  transition: transform 0.6s ease;
}
.hero-cat-img:hover {
  transform: translateY(-6px) scale(1.02);
}

@media (max-width: 1023px) {
  .hero-cat-img {
    max-height: 320px;
  }
}

/* ===== FLOATING BADGES ===== */
@keyframes floatUp {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-8px); }
}
@keyframes floatUpDelayed {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-6px); }
}

.animate-float {
  animation: floatUp 3.5s ease-in-out infinite;
}
.animate-float-delayed {
  animation: floatUpDelayed 4s ease-in-out 1.2s infinite;
}
</style>