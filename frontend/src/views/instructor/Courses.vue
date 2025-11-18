<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
    <div class="max-w-3xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-10">
        <h1 class="text-4xl font-bold text-gray-900">Create New Course</h1>
        <p class="mt-3 text-lg text-gray-600">
          Start building your course and share your knowledge with students worldwide
        </p>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <!-- Gradient Header -->
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-10 py-8 text-white">
          <h2 class="text-3xl font-bold">Course Information</h2>
          <p class="mt-2 opacity-90">Fill in the details to get started</p>
        </div>

        <form @submit.prevent="submitCourse" class="p-10 space-y-8">
          <!-- Course Title -->
          <div class="space-y-2">
            <label for="title" class="block text-lg font-semibold text-gray-800">
              Course Title <span class="text-red-500">*</span>
            </label>
            <input
              id="title"
              v-model="title"
              type="text"
              placeholder="e.g. Complete Web Development Bootcamp 2025"
              class="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-shadow"
              required
              autocomplete="off"
            />
            <p class="text-sm text-gray-500">Make it clear and attractive!</p>
          </div>

          <!-- Course Description -->
          <div class="space-y-2">
            <label for="description" class="block text-lg font-semibold text-gray-800">
              Course Description <span class="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              v-model="description"
              rows="6"
              placeholder="Describe what students will learn, prerequisites, who this course is for, and what makes it unique..."
              class="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-shadow resize-none"
              required
            ></textarea>
            <p class="text-sm text-gray-500">Students read this first — make it engaging!</p>
          </div>

          <!-- Actions -->
          <div class="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="submit"
              :disabled="loading"
              class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg py-4 px-8 rounded-2xl hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-purple-300 disabled:opacity-60 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-xl"
            >
              <span v-if="!loading" class="flex items-center justify-center gap-3">
                Create Course
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              <span v-else class="flex items-center justify-center gap-3">
                <svg class="animate-spin h-6 w-6" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Course...
              </span>
            </button>

            <button
              type="button"
              @click="$router.push('/instructor/courses')"
              class="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold text-lg rounded-2xl hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <!-- Success Message -->
      <Transition name="fade">
        <div
          v-if="showSuccess"
          class="mt-8 p-6 bg-green-50 border-2 border-green-200 rounded-2xl text-center"
        >
          <div class="text-green-800 text-xl font-bold">
          Course created successfully!
          </div>
          <p class="text-green-700 mt-2">Redirecting to your courses...</p>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from "../../utils/api"

const router = useRouter()

const title = ref('')
const description = ref('')
const loading = ref(false)
const showSuccess = ref(false)

const submitCourse = async () => {
  if (!title.value.trim() || !description.value.trim()) {
    alert("Please fill in all fields.")
    return
  }

  loading.value = true
  showSuccess.value = false

  try {
    await api.post("/instructor/courses", {
      title: title.value.trim(),
      description: description.value.trim(),
    })

    showSuccess.value = true

    // Reset form
    title.value = ''
    description.value = ''

    // Redirect after success animation
    setTimeout(() => {
      router.push('/instructor/courses')
    }, 2000)
  } catch (err) {
    console.error("Error creating course:", err)
    const message = err.response?.data?.message || "Failed to create course. Please try again."
    alert(message)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>