<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">

    <!-- Floating Books -->
    <div
      v-for="book in floatingBooks"
      :key="book.id"
      class="absolute text-blue-200 opacity-20"
      :style="{
        left: book.left + '%',
        animation: `float ${book.duration}s ease-in-out infinite`,
        animationDelay: book.delay + 's',
        top: '-10%'
      }"
    >
      <BookOpen :size="48" />
    </div>

    <div class="max-w-2xl w-full text-center z-10">

      <!-- Main 404 Illustration -->
      <div class="mb-8 relative">
        <div class="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
          404
        </div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <GraduationCap size="80" class="text-indigo-300 opacity-30" />
        </div>
      </div>

      <!-- Message -->
      <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Oops! This Lesson Doesn't Exist
      </h1>
      <p class="text-lg text-gray-600 mb-8 max-w-md mx-auto">
        Looks like you've wandered off the curriculum. Don't worry, even the best students take wrong turns sometimes!
      </p>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
        <button
          @click="goBack"
          class="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <ArrowLeft size="20" />
          Go Back
        </button>

        <button
          @click="goHome"
          class="flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <Home size="20" />
          Home
        </button>
      </div>

      <!-- Quick Links -->
      <div class="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm bg-opacity-80">
        <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center justify-center gap-2">
          <BookOpen size="24" class="text-indigo-600" />
          Popular Courses
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a href="#" class="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 group">
            <div class="text-2xl mb-2">💻</div>
            <h3 class="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">Web Development</h3>
          </a>

          <a href="#" class="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all duration-300 group">
            <div class="text-2xl mb-2">🎨</div>
            <h3 class="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">Design</h3>
          </a>

          <a href="#" class="p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-all duration-300 group">
            <div class="text-2xl mb-2">📊</div>
            <h3 class="font-semibold text-gray-800 group-hover:text-green-600 transition-colors">Data Science</h3>
          </a>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="mt-8">
        <div class="relative max-w-md mx-auto">
          <Search size="20" class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for courses..."
            class="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { BookOpen, Home, Search, ArrowLeft, GraduationCap } from 'lucide-vue-next'

const floatingBooks = ref([])

onMounted(() => {
  floatingBooks.value = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 15 + Math.random() * 10
  }))
})

const goBack = () => window.history.back()
const goHome = () => window.location.href = '/'
</script>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(100vh) rotate(180deg);
  }
}
</style>
