<template>
  <header
    :class="[
      'fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-[#E9E0D5]',
      isScrolled ? 'shadow-md py-1' : 'shadow-sm py-2'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Brand -->
        <router-link to="/" class="flex items-center space-x-2.5 group">
          <img
            :src="withBase('images/navbar/logoKucing.png')"
            alt="AdopKucing Logo"
            class="h-10 w-10 rounded-full bg-[#FFF0E4] object-contain p-0.5 border border-[#E9E0D5] transition-transform duration-300 group-hover:scale-105"
          />
          <span class="text-xl font-bold text-[#2D2926] group-hover:text-[#E9823D] transition-colors leading-none tracking-tight">
            Adop<span class="text-[#E9823D]">Kucing</span>
          </span>
        </router-link>

        <!-- Nav Links (Desktop) -->
        <nav class="hidden md:flex items-center space-x-1 lg:space-x-2">
          <router-link
            to="/"
            exact
            exact-active-class="bg-[#FFF0E4] text-[#E9823D] font-semibold"
            class="px-3 py-2 rounded-lg text-[#77716B] hover:text-[#E9823D] hover:bg-[#FFF0E4]/60 transition text-sm font-medium"
          >
            Beranda
          </router-link>

          <router-link
            to="/adoption"
            active-class="bg-[#FFF0E4] text-[#E9823D] font-semibold"
            class="px-3 py-2 rounded-lg text-[#77716B] hover:text-[#E9823D] hover:bg-[#FFF0E4]/60 transition text-sm font-medium"
          >
            Adopsi
          </router-link>

          <router-link
            to="/report-rescue"
            active-class="bg-[#FFF0E4] text-[#E9823D] font-semibold"
            class="px-3 py-2 rounded-lg text-[#77716B] hover:text-[#E9823D] hover:bg-[#FFF0E4]/60 transition text-sm font-medium"
          >
            Report & Rescue
          </router-link>

          <router-link
            to="/donate"
            active-class="bg-[#FFF0E4] text-[#E9823D] font-semibold"
            class="px-3 py-2 rounded-lg text-[#77716B] hover:text-[#E9823D] hover:bg-[#FFF0E4]/60 transition text-sm font-medium"
          >
            Donasi
          </router-link>

          <router-link
            to="/news"
            active-class="bg-[#FFF0E4] text-[#E9823D] font-semibold"
            class="px-3 py-2 rounded-lg text-[#77716B] hover:text-[#E9823D] hover:bg-[#FFF0E4]/60 transition text-sm font-medium"
          >
            Berita
          </router-link>

          <button
            @click="scrollToSection('about')"
            class="px-3 py-2 rounded-lg text-[#77716B] hover:text-[#E9823D] hover:bg-[#FFF0E4]/60 transition text-sm font-medium cursor-pointer"
          >
            About Us
          </button>

          <button
            @click="scrollToSection('faq')"
            class="px-3 py-2 rounded-lg text-[#77716B] hover:text-[#E9823D] hover:bg-[#FFF0E4]/60 transition text-sm font-medium cursor-pointer"
          >
            FAQ
          </button>
        </nav>

        <!-- Right Side (Desktop) -->
        <div class="hidden md:flex items-center space-x-3">
          <!-- Kalau BELUM login -->
          <template v-if="!isLoggedIn && !isAuthPage">
            <router-link
              to="/login"
              class="btn btn-primary text-xs lg:text-sm px-4 py-2"
            >
              Log in
            </router-link>
            <router-link
              to="/sign-up"
              class="btn btn-outline text-xs lg:text-sm px-4 py-2"
            >
              Sign up
            </router-link>
          </template>

          <!-- Kalau SUDAH login -->
          <template v-else-if="isLoggedIn">
            <div class="relative group flex items-center space-x-2 py-1">
              <img
                :src="withBase('images/home/Cat 9.jpg')"
                alt="User Avatar"
                class="h-9 w-9 rounded-full bg-[#FFF0E4] border border-[#E9E0D5] object-cover cursor-pointer shadow-sm"
              />
              <span class="text-[#2D2926] font-semibold text-sm cursor-pointer group-hover:text-[#E9823D] transition">
                {{ currentUser?.name || 'User' }}
              </span>

              <!-- Dropdown Menu -->
              <div
                class="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-lg border border-[#E9E0D5] py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
              >
                <router-link
                  to="/profile"
                  class="block px-4 py-2 text-sm text-[#2D2926] hover:bg-[#FFF0E4] hover:text-[#E9823D] transition"
                >
                  Profile Saya
                </router-link>
                <router-link
                  to="/dashboard"
                  class="block px-4 py-2 text-sm text-[#2D2926] hover:bg-[#FFF0E4] hover:text-[#E9823D] transition"
                >
                  Dashboard
                </router-link>
                <div class="border-t border-[#E9E0D5] my-1"></div>
                <button
                  @click="logout"
                  class="w-full text-left block px-4 py-2 text-sm text-[#D85A4F] hover:bg-[#FFF0E4] transition font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="mobileOpen = !mobileOpen"
          aria-label="Toggle navigation menu"
          :aria-expanded="mobileOpen"
          class="md:hidden p-2 rounded-lg text-[#2D2926] hover:text-[#E9823D] hover:bg-[#FFF0E4] transition focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              v-if="!mobileOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <transition name="slide-fade">
      <div
        v-if="mobileOpen"
        class="md:hidden bg-white/95 backdrop-blur-md border-t border-[#E9E0D5] shadow-lg"
      >
        <nav class="flex flex-col px-4 py-3 space-y-1">
          <router-link
            to="/"
            exact
            exact-active-class="bg-[#FFF0E4] text-[#E9823D] font-semibold"
            class="block px-4 py-2.5 rounded-lg text-[#2D2926] hover:text-[#E9823D] hover:bg-[#FFF0E4] transition text-base font-medium"
          >
            Beranda
          </router-link>

          <router-link
            to="/adoption"
            active-class="bg-[#FFF0E4] text-[#E9823D] font-semibold"
            class="block px-4 py-2.5 rounded-lg text-[#2D2926] hover:text-[#E9823D] hover:bg-[#FFF0E4] transition text-base font-medium"
          >
            Adopsi
          </router-link>

          <router-link
            to="/report-rescue"
            active-class="bg-[#FFF0E4] text-[#E9823D] font-semibold"
            class="block px-4 py-2.5 rounded-lg text-[#2D2926] hover:text-[#E9823D] hover:bg-[#FFF0E4] transition text-base font-medium"
          >
            Report & Rescue
          </router-link>

          <router-link
            to="/donate"
            active-class="bg-[#FFF0E4] text-[#E9823D] font-semibold"
            class="block px-4 py-2.5 rounded-lg text-[#2D2926] hover:text-[#E9823D] hover:bg-[#FFF0E4] transition text-base font-medium"
          >
            Donasi
          </router-link>

          <router-link
            to="/news"
            active-class="bg-[#FFF0E4] text-[#E9823D] font-semibold"
            class="block px-4 py-2.5 rounded-lg text-[#2D2926] hover:text-[#E9823D] hover:bg-[#FFF0E4] transition text-base font-medium"
          >
            Berita
          </router-link>

          <button
            @click="handleMobileClick('about')"
            class="w-full text-left px-4 py-2.5 rounded-lg text-[#2D2926] hover:text-[#E9823D] hover:bg-[#FFF0E4] transition text-base font-medium cursor-pointer"
          >
            About Us
          </button>

          <button
            @click="handleMobileClick('faq')"
            class="w-full text-left px-4 py-2.5 rounded-lg text-[#2D2926] hover:text-[#E9823D] hover:bg-[#FFF0E4] transition text-base font-medium cursor-pointer"
          >
            FAQ
          </button>

          <!-- Mobile Auth Buttons / User State -->
          <div v-if="!isLoggedIn && !isAuthPage" class="pt-3 mt-2 border-t border-[#E9E0D5] flex flex-col space-y-2">
            <router-link
              to="/login"
              class="btn btn-primary w-full text-center py-2.5"
            >
              Log in
            </router-link>
            <router-link
              to="/sign-up"
              class="btn btn-outline w-full text-center py-2.5"
            >
              Sign up
            </router-link>
          </div>

          <div v-else-if="isLoggedIn" class="pt-3 mt-2 border-t border-[#E9E0D5] space-y-1">
            <router-link
              to="/profile"
              class="block px-4 py-2.5 rounded-lg text-[#2D2926] hover:text-[#E9823D] hover:bg-[#FFF0E4] transition text-base font-medium"
            >
              Profile Saya ({{ currentUser?.name }})
            </router-link>
            <router-link
              to="/dashboard"
              class="block px-4 py-2.5 rounded-lg text-[#2D2926] hover:text-[#E9823D] hover:bg-[#FFF0E4] transition text-base font-medium"
            >
              Dashboard
            </router-link>
            <button
              @click="logout"
              class="w-full text-left block px-4 py-2.5 rounded-lg text-[#D85A4F] hover:bg-[#FFF0E4] transition text-base font-semibold"
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { withBase } from '@/utils/paths'
import { getCurrentUser, logoutUser } from '@/utils/storage'

const router = useRouter()
const route = useRoute()

const isScrolled = ref(false)
const mobileOpen = ref(false)
const isLoggedIn = ref(false)
const currentUser = ref(null)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

const checkLoginState = () => {
  const user = getCurrentUser()
  isLoggedIn.value = !!user
  currentUser.value = user
}

onMounted(() => {
  checkLoginState()
  handleScroll()
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('login-state-changed', checkLoginState)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('login-state-changed', checkLoginState)
})

const isAuthPage = computed(() => ['/login', '/sign-up'].includes(route.path))

watch(route, () => {
  mobileOpen.value = false
})

// Scroll function
const scrollToSection = async (sectionId) => {
  if (route.path !== '/') {
    await router.push({ path: '/', query: { section: sectionId } })
  } else {
    const section = document.getElementById(sectionId)
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// Mobile scroll click handler
const handleMobileClick = async (sectionId) => {
  mobileOpen.value = false
  await scrollToSection(sectionId)
}

// Logout handler
const logout = () => {
  logoutUser()
  mobileOpen.value = false
  router.push('/')
}
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
