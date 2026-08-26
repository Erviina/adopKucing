<template>
  <section class="pt-24 pb-16 bg-[#f7f1e8] min-h-screen ">
    <!-- Hero -->
    <div class="max-w-6xl mx-auto px-6 text-center">
      <h1 class="text-3xl md:text-5xl font-bold text-gray-800 mb-4">Support Our Cats ❤️</h1>
      <p class="text-gray-600 mb-8 text-base md:text-lg">
        Every donation helps us rescue, feed, and care for abandoned cats.  
        100% of your support goes directly to the welfare of our feline friends.
      </p>
      <img
        :src="heroImage"
        alt="Happy cat"
        class="mx-auto rounded-2xl shadow-lg w-full max-w-xl object-cover"
      />
    </div>

    <!-- Donation Section -->
    <div class="max-w-4xl mx-auto mt-12 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <h2 class="text-2xl font-semibold text-gray-800 text-center mb-6">Choose Your Donation</h2>

      <!-- Quick amounts -->
      <div class="flex flex-wrap justify-center gap-4 mb-6">
        <button
          v-for="amount in quickAmounts"
          :key="amount"
          @click="selectAmount(amount)"
          :class="[
            'px-6 py-3 rounded-full border transition font-medium text-gray-700',
            selectedAmount === amount
              ? 'bg-blue-600 text-white border-blue-600'
              : 'hover:bg-blue-50 border-gray-300'
          ]"
        >
          Rp{{ amount.toLocaleString() }}
        </button>
      </div>

      <!-- Custom input -->
      <div class="flex justify-center mb-6">
        <input
          v-model.number="customAmount"
          type="number"
          placeholder="Enter custom amount (Rp)"
          class="w-2/3 sm:w-1/2 border border-gray-300 rounded-full px-5 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Payment methods -->
      <div class="text-center mb-6">
        <h3 class="text-lg font-semibold mb-3">Choose Payment Method</h3>
        <div class="flex justify-center gap-4 flex-wrap">
          <button
            v-for="method in paymentMethods"
            :key="method.name"
            @click="selectedMethod = method.name"
            :class="[
              'px-5 py-3 rounded-xl border transition font-medium flex items-center justify-center gap-2',
              selectedMethod === method.name
                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                : 'hover:bg-blue-50 border-gray-300 text-gray-700 bg-white'
            ]"
          >
            <span class="w-10 h-6 rounded flex items-center justify-center text-[10px] font-bold tracking-wider" :class="getMethodBadgeClass(method.name, selectedMethod === method.name)">
              {{ method.badgeText }}
            </span>
            {{ method.label }}
          </button>
        </div>
      </div>

      <!-- Donate button -->
      <div class="text-center">
        <button
          @click="donate"
          :disabled="!finalAmount || !selectedMethod"
          class="px-8 py-3 rounded-full font-semibold text-white transition-all"
          :class="[
            finalAmount && selectedMethod
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-300 cursor-not-allowed'
          ]"
        >
          Donate Now ❤️
        </button>
      </div>
    </div>

    <!-- Our Impact Section -->
    <div class="max-w-6xl mx-auto mt-20 px-6 text-center">
      <h2 class="text-3xl font-semibold text-gray-800 mb-8">Your Donations Make a Difference</h2>
      <div class="grid md:grid-cols-3 gap-6">
        <div v-for="(item, i) in impacts" :key="i" class="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <img :src="item.image" class="w-full h-48 object-cover rounded-xl mb-4" />
          <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ item.title }}</h3>
          <p class="text-gray-600 text-sm">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { withBase } from '@/utils/paths'

const heroImage = withBase('images/home/Cat 9.jpg')

// quick donation buttons
const quickAmounts = [10000, 25000, 50000, 100000, 250000]
const selectedAmount = ref(null)
const customAmount = ref(null)

const finalAmount = computed(() => customAmount.value || selectedAmount.value)

// payment methods
const paymentMethods = [
  { name: 'qris', label: 'QRIS', badgeText: 'QRIS' },
  { name: 'bca', label: 'BCA Transfer', badgeText: 'BCA' },
  { name: 'gopay', label: 'GoPay', badgeText: 'GPY' },
  { name: 'ovo', label: 'OVO', badgeText: 'OVO' },
]
const selectedMethod = ref(null)

const getMethodBadgeClass = (name, isSelected) => {
  if (isSelected) {
    return 'bg-white/20 text-white border border-white/40'
  }
  switch (name) {
    case 'qris': return 'bg-red-100 text-red-700 border border-red-200'
    case 'bca': return 'bg-blue-100 text-blue-700 border border-blue-200'
    case 'gopay': return 'bg-green-100 text-green-700 border border-green-200'
    case 'ovo': return 'bg-purple-100 text-purple-700 border border-purple-200'
    default: return 'bg-gray-100 text-gray-700 border border-gray-200'
  }
}

// our impact cards
const impacts = [
  {
    title: '50+ Cats Rescued',
    desc: 'We’ve successfully rescued more than 50 cats this year from dangerous environments.',
    image: heroImage,
  },
  {
    title: 'Healthy Meals Daily',
    desc: 'Your donations provide food for our rescued cats every single day.',
    image: heroImage,
  },
  {
    title: 'Medical Care',
    desc: 'Donations help cover vaccination, sterilization, and emergency vet treatments.',
    image: heroImage,
  },
]

// event handlers
function selectAmount(amount) {
  selectedAmount.value = amount
  customAmount.value = null
}

function donate() {
  if (!finalAmount.value || !selectedMethod.value) return
  alert(`Thank you for donating Rp${finalAmount.value.toLocaleString()} via ${selectedMethod.value.toUpperCase()} ❤️`)
  selectedAmount.value = null
  customAmount.value = null
  selectedMethod.value = null
}
</script>

<style scoped>
button {
  transition: all 0.25s ease;
}
</style>
