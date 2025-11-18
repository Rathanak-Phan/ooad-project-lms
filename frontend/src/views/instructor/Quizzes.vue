<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-10">
        <h1 class="text-4xl font-bold text-gray-900">Create New Quiz</h1>
        <p class="mt-3 text-lg text-gray-600">Build an engaging quiz to test your students' knowledge</p>
      </div>

      <!-- Main Card -->
      <div class="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-10 py-8 text-white">
          <h2 class="text-3xl font-bold">Quiz Details</h2>
          <p class="mt-2 opacity-90">Start with the basics, then add questions</p>
        </div>

        <form @submit.prevent="submitQuiz" class="p-10 space-y-10">
          <!-- Quiz Title & Description -->
          <div class="grid md:grid-cols-2 gap-8">
            <div class="space-y-3">
              <label class="block text-lg font-semibold text-gray-800">
                Quiz Title <span class="text-red-500">*</span>
              </label>
              <input
                v-model="title"
                type="text"
                placeholder="e.g. JavaScript Fundamentals Quiz"
                class="w-full px-5 py-4 border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                required
              />
            </div>
            <div class="space-y-3">
              <label class="block text-lg font-semibold text-gray-800">Description (Optional)</label>
              <input
                v-model="description"
                type="text"
                placeholder="Brief description of the quiz"
                class="w-full px-5 py-4 border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition"
              />
            </div>
          </div>

          <!-- Questions Section -->
          <div>
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-2xl font-bold text-gray-800">Questions ({{ questions.length }})</h3>
              <button
                type="button"
                @click="addQuestion"
                class="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition shadow-lg hover:shadow-xl"
              >
                + Add Question
              </button>
            </div>

            <TransitionGroup name="list" tag="div" class="space-y-6">
              <div
                v-for="(q, qIndex) in questions"
                :key="q.id"
                class="bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-300 rounded-2xl p-8 relative shadow-md hover:shadow-lg transition"
              >
                <!-- Remove Question -->
                <button
                  type="button"
                  @click="removeQuestion(qIndex)"
                  class="absolute top-4 right-4 text-red-500 hover:text-red-700 font-bold text-xl"
                >
                  X
                </button>

                <!-- Question Text -->
                <div class="mb-6">
                  <label class="block text-lg font-semibold text-gray-800 mb-3">
                    Question {{ qIndex + 1 }}
                  </label>
                  <input
                    v-model="q.question"
                    placeholder="Enter your question here..."
                    class="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition"
                    required
                  />
                </div>

                <!-- Options -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    v-for="(option, oIndex) in q.options"
                    :key="oIndex"
                    class="flex items-center gap-3 bg-white rounded-xl p-4 border-2"
                    :class="q.correct === oIndex ? 'border-green-500 ring-4 ring-green-200' : 'border-gray-200'"
                  >
                    <input
                      v-model="q.options[oIndex]"
                      placeholder="Option text"
                      class="flex-1 px-4 py-3 border-0 focus:ring-0 focus:outline-none text-base"
                      required
                    />
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        :name="'correct-' + q.id"
                        :value="oIndex"
                        v-model="q.correct"
                        class="w-5 h-5 text-green-600 focus:ring-green-500"
                      />
                      <span class="font-medium text-green-700">Correct</span>
                    </label>
                  </div>
                </div>

                <!-- Add Option Button -->
                <button
                  v-if="q.options.length < 6"
                  type="button"
                  @click="addOption(qIndex)"
                  class="mt-4 text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-2"
                >
                  + Add Option
                </button>
              </div>
            </TransitionGroup>

            <!-- Empty State -->
            <div v-if="questions.length === 0" class="text-center py-16 text-gray-500">
              <p class="text-xl">No questions yet. Click "Add Question" to start!</p>
            </div>
          </div>

          <!-- Submit -->
          <div class="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
            <button
              type="submit"
              :disabled="loading || questions.length === 0"
              class="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xl py-5 px-8 rounded-2xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              <span v-if="!loading" class="flex items-center justify-center gap-3">
                Create Quiz
              </span>
              <span v-else class="flex items-center justify-center gap-3">
                <svg class="animate-spin h-6 w-6" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Quiz...
              </span>
            </button>

            <button
              type="button"
              @click="$router.push('/instructor/quizzes')"
              class="px-8 py-5 border-2 border-gray-300 text-gray-700 font-bold text-xl rounded-2xl hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <!-- Success Message -->
      <Transition name="fade">
        <div v-if="showSuccess" class="mt-8 p-6 bg-green-50 border-2 border-green-300 rounded-2xl text-center">
          <p class="text-2xl font-bold text-green-800">Quiz Created Successfully!</p>
          <p class="text-green-700 mt-2">Redirecting to your quizzes...</p>
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
const questions = ref([])
const loading = ref(false)
const showSuccess = ref(false)

// Generate unique ID
let idCounter = 0
const generateId = () => ++idCounter

const addQuestion = () => {
  questions.value.push({
    id: generateId(),
    question: '',
    options: ['', '', '', ''],
    correct: 0
  })
}

const removeQuestion = (index) => {
  questions.value.splice(index, 1)
}

const addOption = (qIndex) => {
  if (questions.value[qIndex].options.length < 6) {
    questions.value[qIndex].options.push('')
  }
}

const submitQuiz = async () => {
  if (!title.value.trim()) return alert("Quiz title is required.")
  if (questions.value.length === 0) return alert("Add at least one question.")

  loading.value = true
  showSuccess.value = false

  try {
    // Create Quiz
    const quizRes = await api.post("/instructor/quiz", {
      title: title.value,
      description: description.value || null,
    })
    const quizId = quizRes.data.id

    // Add Questions
    for (const q of questions.value) {
      await api.post(`/instructor/quiz/${quizId}/question`, {
        question: q.question,
        options: q.options.filter(o => o.trim()),
        answer: q.options[q.correct]
      })
    }

    showSuccess.value = true
    setTimeout(() => {
      router.push('/instructor')
    }, 2000)
  } catch (err) {
    console.error("Quiz creation error:", err)
    alert(err.response?.data?.message || "Failed to create quiz.")
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.list-enter-active, .list-leave-active { transition: all 0.4s ease; }
.list-enter-from, .list-leave-to { opacity: 0; transform: translateY(30px); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>