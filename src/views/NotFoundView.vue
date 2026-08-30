<template>
  <main class="min-h-screen bg-[#F8F3EA] pt-24 pb-16 flex items-center justify-center">
    <div class="container-custom max-w-md text-center">
      <div class="card-custom bg-white p-8 sm:p-12 shadow-lg">
        <div class="text-6xl mb-4">🐾 😿</div>
        <h1 class="text-4xl font-extrabold text-[#2D2926] mb-2">404</h1>
        <h2 class="text-xl font-bold text-[#E9823D] mb-3">Ups! Halaman Tidak Ditemukan</h2>
        <p class="text-sm text-[#77716B] leading-relaxed mb-6">
          Halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau alamat URL yang dimasukkan salah.
        </p>

        <router-link
          to="/"
          class="btn btn-primary px-7 py-3 text-sm font-bold shadow-md hover:shadow-lg inline-flex items-center gap-2"
        >
          <span>🏠</span> Kembali ke Beranda
        </router-link>
      </div>
    </div>
  </main>
</template>

<script setup>
</script>

<style scoped></style>
