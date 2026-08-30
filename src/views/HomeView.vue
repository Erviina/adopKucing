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
    <section class="services-section py-12 sm:py-14 lg:py-16 bg-white border-y border-[#E9E0D5]">
      <div class="container-custom">
        <div class="text-center max-w-2xl mx-auto mb-8 sm:mb-10 lg:mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold text-[#2D2926] mb-3">Layanan &amp; Fitur Utama</h2>
          <p class="text-[#77716B] text-sm sm:text-base">
            Satu tempat untuk penanganan, adopsi, dan bantuan penyelamatan kucing jalanan.
          </p>
        </div>

        <div class="services-grid">
          <!-- Card 1: Adopsi Kucing -->
          <div class="service-card card-custom">
            <div class="service-card__icon-wrap bg-[#FFF0E4] text-[#E9823D]">
              🐱
            </div>
            <h3 class="service-card__title">Adopsi Kucing</h3>
            <p class="service-card__desc">
              Jelajahi kucing rescue yang telah divaksin dan steril, siap menyambut keluarga baru.
            </p>
            <router-link to="/adoption" class="service-card__link text-[#E9823D] hover:text-[#C96A29]">
              Lihat Katalog →
            </router-link>
          </div>

          <!-- Card 2: Report & Rescue -->
          <div class="service-card card-custom">
            <div class="service-card__icon-wrap bg-red-50 text-red-500">
              🚨
            </div>
            <h3 class="service-card__title">Report &amp; Rescue</h3>
            <p class="service-card__desc">
              Temukan kucing jalanan yang terluka atau butuh bantuan? Laporkan lokasi secara mudah.
            </p>
            <router-link to="/report-rescue" class="service-card__link text-red-600 hover:text-red-700">
              Buat Laporan →
            </router-link>
          </div>

          <!-- Card 3: Donasi Kasih -->
          <div class="service-card card-custom">
            <div class="service-card__icon-wrap bg-emerald-50 text-[#3D9B6D]">
              ❤️
            </div>
            <h3 class="service-card__title">Donasi Kasih</h3>
            <p class="service-card__desc">
              Bantu biaya obat, makanan, dan sterilisasi gratis untuk kucing rescue.
            </p>
            <router-link to="/donate" class="service-card__link text-[#3D9B6D] hover:text-emerald-700">
              Salurkan Donasi →
            </router-link>
          </div>

          <!-- Card 4: Berita & Komunitas -->
          <div class="service-card card-custom">
            <div class="service-card__icon-wrap bg-amber-50 text-[#D99A2B]">
              📰
            </div>
            <h3 class="service-card__title">Berita &amp; Komunitas</h3>
            <p class="service-card__desc">
              Dapatkan kabar terkini, cerita penyelamatan, serta edukasi seputar perawatan kucing.
            </p>
            <router-link to="/news" class="service-card__link text-[#D99A2B] hover:text-amber-700">
              Baca Berita →
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

/* ===================================================
   SERVICES / FEATURE CARDS
=================================================== */

/* Grid: default 1 col → 2 col @480px → 4 col @1024px */
.services-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

/* 2 kolom mulai 480px (sudah cukup lebar untuk card readable) */
@media (min-width: 480px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }
}

/* 4 kolom hanya ab 1024px (desktop) */
@media (min-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
}

/* === Card === */
.service-card {
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  /* Pastikan card tidak overflow container */
  min-width: 0;
}

@media (min-width: 768px) {
  .service-card {
    padding: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .service-card {
    padding: 1.5rem;
  }
}

.service-card:hover {
  transform: translateY(-4px);
}

/* === Icon Wrap === */
.service-card__icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.75rem;
  font-size: 1.375rem;
  flex-shrink: 0;
  margin-bottom: 0.875rem;
}

/* === Title === */
.service-card__title {
  font-size: 1rem;
  font-weight: 700;
  color: #2D2926;
  margin-bottom: 0.5rem;
  line-height: 1.3;
  /* Cegah kata pecah per karakter */
  overflow-wrap: break-word;
  word-break: normal;
  hyphens: none;
}

@media (min-width: 1024px) {
  .service-card__title {
    font-size: 1.0625rem;
  }
}

/* === Description === */
.service-card__desc {
  font-size: 0.8125rem;
  color: #77716B;
  line-height: 1.6;
  margin-bottom: 1rem;
  flex-grow: 1;
  /* Natural word wrapping — TIDAK break-all */
  overflow-wrap: break-word;
  word-break: normal;
  hyphens: none;
}

@media (min-width: 768px) {
  .service-card__desc {
    font-size: 0.875rem;
  }
}

/* === Link === */
.service-card__link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8125rem;
  font-weight: 600;
  text-decoration: none;
  margin-top: auto;
  transition: opacity 0.2s ease;
  /* Jangan biarkan link wrap antar kata secara aneh */
  white-space: nowrap;
}

.service-card__link:hover {
  opacity: 0.8;
}
</style>