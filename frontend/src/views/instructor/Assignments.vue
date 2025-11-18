<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-2xl mx-auto">
      <!-- Header -->
      <div class="mb-8 text-center">
        <h1 class="text-4xl font-bold text-gray-900">Create New Assignment</h1>
        <p class="mt-2 text-gray-600">Add a new assignment for your students</p>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-5">
          <h2 class="text-2xl font-bold text-white">Assignment Details</h2>
        </div>

        <form @submit.prevent="submitAssignment" class="p-8 space-y-6">
          <!-- Title -->
          <div>
            <label for="title" class="block text-sm font-semibold text-gray-700 mb-2">
              Assignment Title <span class="text-red-500">*</span>
            </label>
            <input
              id="title"
              v-model="title"
              type="text"
              placeholder="e.g. Week 3: React Hooks Fundamentals"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          <!-- Description -->
          <div>
            <label for="description" class="block text-sm font-semibold text-gray-700 mb-2">
              Description <span class="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              v-model="description"
              rows="5"
              placeholder="Provide clear instructions, learning objectives, and submission guidelines..."
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              required
            ></textarea>
          </div>

          <!-- Due Date -->
          <div>
            <label for="dueDate" class="block text-sm font-semibold text-gray-700 mb-2">
              Due Date & Time <span class="text-red-500">*</span>
            </label>
            <input
              id="dueDate"
              v-model="dueDate"
              type="datetime-local"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              :min="minDateTime"
              required
            />
            <p class="mt-2 text-sm text-gray-500">
              Students can submit until this time
            </p>
          </div>

          <!-- Submit Button -->
          <div class="flex gap-4 pt-4">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="flex-1 bg-blue-600 text-white font-semibold py-3.5 px-6 rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-70 disabled:cursor-not-allowed transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span v-if="!isSubmitting">
                Create Assignment
              </span>
              <span v-else class="flex items-center justify-center gap-2">
                <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </span>
            </button>

            <button
              type="button"
              @click="$router.push('/instructor/assignments')"
              class="px-6 py-3.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <!-- Success Message (optional inline feedback) -->
      <div v-if="showSuccess" class="mt-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl text-center font-medium">
        Assignment created successfully! Redirecting...
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from "../../utils/api"

const router = useRouter()

// Form fields
const title = ref('')
const description = ref('')
const dueDate = ref('')

// UI state
const isSubmitting = ref(false)
const showSuccess = ref(false)

// Prevent past dates
const minDateTime = computed(() => {
  const now = new Date()
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset()) // Fix timezone offset
  return now.toISOString().slice(0, 16)
})

const submitAssignment = async () => {
  if (!title.value.trim() || !description.value.trim() || !dueDate.value) return

  isSubmitting.value = true
  showSuccess.value = false

  try {
    await api.post("/instructor/assignment", {
      title: title.value,
      description: description.value,
      due_date: dueDate.value,
    })

    showSuccess.value = true
    setTimeout(() => {
      router.push('/instructor')
    }, 1500)
  } catch (err) {
    console.error("Create Error:", err.response || err)
    alert("Failed to create assignment. Please try again.")
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* Optional: enhance focus rings */
input:focus, textarea:focus {
  outline: none;
}
</style>