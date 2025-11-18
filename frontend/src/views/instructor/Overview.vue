<template>
  <div class="space-y-8">
    <!-- Welcome Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Welcome back, {{ userName }}!</h1>
      <p class="text-gray-600 mt-2">Here's what's happening with your courses today.</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total Courses -->
      <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-blue-100 text-sm font-medium">Total Courses</p>
            <p class="text-3xl font-bold mt-2">{{ stats.courses }}</p>
          </div>
          <div class="bg-blue-400 bg-opacity-30 p-4 rounded-xl">
            <BookOpenIcon />
          </div>
        </div>
      </div>

      <!-- Assignments -->
      <div class="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-green-100 text-sm font-medium">Assignments</p>
            <p class="text-3xl font-bold mt-2">{{ stats.assignments }}</p>
          </div>
          <div class="bg-green-400 bg-opacity-30 p-4 rounded-xl">
            <DocumentCheckIcon />
          </div>
        </div>
      </div>

      <!-- Quizzes -->
      <div class="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-purple-100 text-sm font-medium">Quizzes</p>
            <p class="text-3xl font-bold mt-2">{{ stats.quizzes }}</p>
          </div>
          <div class="bg-purple-400 bg-opacity-30 p-4 rounded-xl">
            <QuestionMarkCircleIcon />
          </div>
        </div>
      </div>

      <!-- Students (placeholder) -->
      <div class="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-orange-100 text-sm font-medium">Active Students</p>
            <p class="text-3xl font-bold mt-2">{{ stats.students || 124 }}</p>
          </div>
          <div class="bg-orange-400 bg-opacity-30 p-4 rounded-xl">
            <UsersIcon />
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Recent Assignments -->
      <div class="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div class="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-800">Recent Assignments</h2>
          <button @click="createAssignment" class="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            + New Assignment
          </button>
        </div>

        <div class="p-6">
          <!-- Loading State -->
          <div v-if="loading" class="space-y-4">
            <div v-for="n in 4" :key="n" class="flex justify-between items-center">
              <div class="h-4 bg-gray-200 rounded w-56 animate-pulse"></div>
              <div class="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else-if="assignments.length === 0" class="text-center py-12 text-gray-500">
            <p>No assignments yet. Create your first one!</p>
          </div>

          <!-- Assignments List -->
          <ul v-else class="space-y-4">
            <li
              v-for="assignment in assignments.slice(0, 5)"
              :key="assignment.id"
              class="flex justify-between items-center p-3 -mx-3 rounded-lg hover:bg-gray-50 transition"
            >
              <div>
                <p class="font-medium text-gray-800">{{ assignment.title }}</p>
                <p class="text-sm text-gray-500">Due: {{ formatDate(assignment.due_date) }}</p>
              </div>
              <button class="text-blue-600 font-medium hover:underline">Edit</button>
            </li>
          </ul>

          <div v-if="!loading && assignments.length > 5" class="mt-6 text-center">
            <button @click="goAllAssignments" class="text-blue-600 font-medium hover:underline">
              View all assignments
            </button>
          </div>
        </div>
      </div>

      <!-- Recent Quizzes -->
      <div class="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div class="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-800">Recent Quizzes</h2>
          <button @click="createQuiz" class="text-sm bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
            + New Quiz
          </button>
        </div>

        <div class="p-6">
          <div v-if="loading" class="space-y-4">
            <div v-for="n in 4" :key="n" class="flex justify-between items-center">
              <div class="h-4 bg-gray-200 rounded w-56 animate-pulse"></div>
              <div class="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          <div v-else-if="quizzes.length === 0" class="text-center py-12 text-gray-500">
            <p>No quizzes created yet. Let's make learning fun!</p>
          </div>

          <ul v-else class="space-y-4">
            <li
              v-for="quiz in quizzes.slice(0, 5)"
              :key="quiz.id"
              class="flex justify-between items-center p-3 -mx-3 rounded-lg hover:bg-gray-50 transition"
            >
              <div>
                <p class="font-medium text-gray-800">{{ quiz.title }}</p>
                <p class="text-sm text-gray-500">{{ quiz.questions?.length || 0 }} questions</p>
              </div>
              <button class="text-green-600 font-medium hover:underline">Edit</button>
            </li>
          </ul>

          <div v-if="!loading && quizzes.length > 5" class="mt-6 text-center">
            <button @click="goAllQuizzes" class="text-green-600 font-medium hover:underline">
              View all quizzes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from "../../utils/api"

// Icons as Vue components (no JSX, no errors)
const BookOpenIcon = { template: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>` }

const DocumentCheckIcon = { template: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>` }

const QuestionMarkCircleIcon = { template: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 1.763-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>` }

const UsersIcon = { template: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21h3a2 2 0 002-2v-1a7 7 0 00-14 0v1a2 2 0 002 2h3m-6 0h12"/></svg>` }

const router = useRouter()
const loading = ref(true)

const stats = ref({ courses: 0, assignments: 0, quizzes: 0, students: 0 })
const assignments = ref([])
const quizzes = ref([])

const user = JSON.parse(localStorage.getItem('user') || '{}')
const userName = user.name || user.email?.split('@')[0] || 'Instructor'

const formatDate = (date) => {
  return date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No date'
}

const loadData = async () => {
  try {
    loading.value = true
    const [assignRes, quizRes, courseRes] = await Promise.all([
      api.get("/instructor/assignments"),
      api.get("/instructor/quizzes"),
      api.get("/instructor/courses/count")
    ])

    assignments.value = assignRes.data || []
    quizzes.value = quizRes.data || []
    stats.value.courses = courseRes.data?.courses || 0
    stats.value.assignments = assignments.value.length
    stats.value.quizzes = quizzes.value.length
  } catch (err) {
    console.error("Dashboard load error:", err)
  } finally {
    loading.value = false
  }
}

const createAssignment = () => router.push('/instructor/assignments')
const createQuiz = () => router.push('/instructor/quizzes')
const goAllAssignments = () => router.push('/instructor/assignments')
const goAllQuizzes = () => router.push('/instructor/quizzes')

onMounted(loadData)
</script>

<style scoped>
/* Optional: smooth fade-in */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>