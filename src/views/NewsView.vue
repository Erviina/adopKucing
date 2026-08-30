<template>
  <main class="min-h-screen bg-[#F8F3EA] pt-24 pb-16">
    <div class="container-custom max-w-4xl">
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto mb-10">
        <div class="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FFF0E4] border border-[#E9E0D5] rounded-full text-[#C96A29] text-xs font-semibold uppercase tracking-wider mb-3">
          📰 Kabar & Komunitas
        </div>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-[#2D2926] mb-3">
          Berita & Kisah AdopKucing
        </h1>
        <p class="text-[#77716B] text-sm sm:text-base">
          Dapatkan kisah penyelamatan terbaru, tips perawatan, dan cerita inspiratif dari komunitas pencinta kucing.
        </p>
      </div>

      <!-- Toast Notification Copy Feedback -->
      <transition name="fade">
        <div v-if="toastMsg" class="fixed bottom-6 right-6 z-50 bg-[#2D2926] text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2">
          <span>✅</span> {{ toastMsg }}
        </div>
      </transition>

      <!-- Daftar berita -->
      <div class="space-y-6">
        <div
          v-for="(news, index) in newsList"
          :key="index"
          class="card-custom bg-white overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer border border-[#E9E0D5]"
          @click="openPopup(news)"
        >
          <div class="flex flex-col md:flex-row">
            <div class="md:w-5/12 relative">
              <img
                :src="news.image"
                :alt="news.title"
                class="w-full h-52 md:h-full object-cover"
              />
            </div>
            <div class="md:w-7/12 flex flex-col p-6 justify-between">
              <div>
                <span class="text-[11px] font-bold text-[#E9823D] uppercase tracking-wider block mb-1">
                  {{ news.category || 'Rescue Story' }}
                </span>
                <h2 class="font-bold text-[#2D2926] text-lg sm:text-xl mb-2 hover:text-[#E9823D] transition">
                  {{ news.title }}
                </h2>
                <p class="text-[#77716B] text-xs sm:text-sm leading-relaxed">
                  {{ news.desc }}
                </p>
              </div>

              <div class="mt-4 pt-3 border-t border-[#E9E0D5]/60 flex items-center justify-between text-xs text-[#77716B]">
                <span>🕒 {{ news.date || '30 Aug 2026' }}</span>
                <span class="font-semibold text-[#E9823D]">Baca Selengkapnya &rarr;</span>
              </div>
            </div>
          </div>

          <!-- Aksi Interaktif -->
          <div class="flex flex-wrap items-center justify-between px-6 py-3 border-t border-[#E9E0D5] bg-[#F8F3EA]/50" @click.stop>
            <div class="flex items-center gap-3 text-xs font-semibold text-[#77716B]">
              <button @click.stop="toggleLike(index)" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E9E0D5] hover:bg-[#FFF0E4] hover:text-[#E9823D] transition cursor-pointer">
                <span>❤️</span> <span>{{ news.likes }}</span>
              </button>

              <button @click.stop="openPopup(news)" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E9E0D5] hover:bg-[#FFF0E4] hover:text-[#E9823D] transition cursor-pointer">
                <span>💬</span> <span>{{ news.comments.length }} Komentar</span>
              </button>

              <button @click.stop="shareNews(news)" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E9E0D5] hover:bg-[#FFF0E4] hover:text-[#E9823D] transition cursor-pointer" title="Bagikan Berita">
                <span>🔗</span> Bagikan
              </button>
            </div>

            <div class="flex gap-2 text-base text-[#77716B]" @click.stop>
              <span
                v-for="emoji in emojis"
                :key="emoji.char"
                class="hover:scale-125 transition-transform cursor-pointer flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-[#E9E0D5]"
                @click.stop="addReaction(index, emoji.char)"
              >
                {{ emoji.char }}
                <span v-if="news.reactions[emoji.char]" class="text-[10px] font-bold text-[#E9823D]">{{ news.reactions[emoji.char] }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Reusable Popup Modal -->
    <NewsModal
      v-if="selectedNews"
      :visible="!!selectedNews"
      :news="selectedNews"
      @close="selectedNews = null"
      @update-news="handleUpdateNews"
    />
  </main>
</template>

<script setup>
import { ref } from "vue"
import NewsModal from "../components/NewsPopUp.vue"
import { withBase } from '@/utils/paths'

const newsImage = withBase('images/home/Cat 9.jpg')
const toastMsg = ref('')

const newsList = ref([
  {
    title: "Kisah Rescue Milo: Dari Jalanan Hingga Punya Rumah Baru",
    desc: "Milo ditemukan dalam kondisi sangat lemah di pinggir jalan. Berkat bantuan relawan rescue AdopKucing, kini ia telah pulih total dan diadopsi keluarga hangat.",
    category: "Kisah Sukses",
    date: "30 Aug 2026",
    image: newsImage,
    likes: 42,
    isLiked: false,
    comments: [
      { user: "Mia", text: "Lucunyaaa 😻 Senang sekali melihat Milo bahagia!", likes: 5 },
      { user: "Rafi", text: "Terima kasih relawan hebat AdopKucing!", likes: 3 },
    ],
    newComment: "",
    reactions: {},
  },
  {
    title: "Tim Rescue Berhasil Menyelamatkan Kucing Terjebak",
    desc: "Seekor kucing terlantar berhasil diselamatkan dengan cepat setelah warga mengirimkan laporan lewat fitur Report & Rescue.",
    category: "Penyelamatan Darurat",
    date: "28 Aug 2026",
    image: newsImage,
    likes: 54,
    isLiked: false,
    comments: [{ user: "Luna", text: "Keren sekali tim respon cepatnya!", likes: 4 }],
    newComment: "",
    reactions: {},
  },
])

const emojis = [{ char: "😺" }, { char: "😻" }, { char: "😹" }]

const selectedNews = ref(null)

const toggleLike = (index) => {
  const news = newsList.value[index]
  news.isLiked = !news.isLiked
  news.likes += news.isLiked ? 1 : -1
}

const shareNews = (news) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(`https://adopkucing.com/news/${encodeURIComponent(news.title)}`)
  }
  showToast("Link artikel berita berhasil disalin!")
}

const showToast = (msg) => {
  toastMsg.value = msg
  setTimeout(() => {
    toastMsg.value = ''
  }, 2500)
}

const addReaction = (index, emoji) => {
  const reactions = newsList.value[index].reactions
  reactions[emoji] = (reactions[emoji] || 0) + 1
}

const openPopup = (news) => {
  selectedNews.value = JSON.parse(JSON.stringify(news))
}

const handleUpdateNews = (updated) => {
  const index = newsList.value.findIndex((n) => n.title === updated.title)
  if (index !== -1) {
    newsList.value[index] = { ...updated }
    selectedNews.value = { ...updated }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
