<template>
  <div class="space-y-8">
    <!-- Header -->
    <div>
      <h1 class="text-4xl font-bold text-gray-900">My Profile</h1>
      <p class="mt-2 text-lg text-gray-600">Your instructor account details and teaching stats</p>
    </div>

    <!-- Profile Card -->
    <div class="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
      <div class="h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>

      <div class="relative px-10 pb-10 -mt-16">
        <!-- Avatar -->
        <div class="inline-block">
          <div class="w-32 h-32 bg-white rounded-full p-3 shadow-2xl">
            <div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-5xl font-bold uppercase">
              {{ initials }}
            </div>
          </div>
        </div>

        <!-- Info -->
        <div class="mt-8">
          <h2 class="text-3xl font-bold text-gray-900">{{ fullName }}</h2>
          <p class="text-xl text-gray-600 mt-1">{{ email }}</p>
          <div class="flex items-center gap-4 mt-4">
            <span class="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              Instructor
            </span>
            <span class="text-gray-500">Joined {{ joinDate }}</span>
          </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 bg-gray-50 rounded-2xl p-8">
          <div class="text-center">
            <p class="text-4xl font-bold text-blue-600">{{ stats.courses }}</p>
            <p class="text-gray-600 mt-1">Courses</p>
          </div>
          <div class="text-center">
            <p class="text-4xl font-bold text-green-600">{{ stats.assignments }}</p>
            <p class="text-gray-600 mt-1">Assignments</p>
          </div>
          <div class="text-center">
            <p class="text-4xl font-bold text-purple-600">{{ stats.quizzes }}</p>
            <p class="text-gray-600 mt-1">Quizzes</p>
          </div>
          <div class="text-center">
            <p class="text-4xl font-bold text-orange-600">{{ stats.students || '—' }}</p>
            <p class="text-gray-600 mt-1">Enrolled Students</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Optional: Edit Button (you can add edit modal later) -->
    <div class="text-center">
      <button @click="alert('Edit profile coming soon!')" class="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl transition">
        Edit Profile
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../../utils/api'

// Real user from localStorage (exactly like your login system)
const storedUser = JSON.parse(localStorage.getItem('user') || '{}')

const user = ref(storedUser)
const stats = ref({
  courses: 0,
  assignments: 0,
  quizzes: 0,
  students: 0
})

// Real computed values from actual user data
const initials = computed(() => {
  const name = `${user.value.firstName || ''} ${user.value.lastName || ''}`.trim()
  if (!name) return (user.value.email?.[0] || 'I').toUpperCase()
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
})

const fullName = computed(() => {
  const name = `${user.value.firstName || ''} ${user.value.lastName || ''}`.trim()
  return name || user.value.email || 'Instructor'
})

const email = computed(() => user.value.email || 'No email')

const joinDate = computed(() => {
  const date = user.value.createdAt || user.value.created_at
  if (!date) return 'Recently'
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
})

// Load real teaching stats from your backend
const loadStats = async () => {
  try {
    const [coursesRes, assignmentsRes, quizzesRes] = await Promise.all([
      api.get('/instructor/courses/count'),
      api.get('/instructor/assignments'),
      api.get('/instructor/quizzes')
    ])

    stats.value.courses = coursesRes.data?.courses || coursesRes.data?.count || 0
    stats.value.assignments = assignmentsRes.data?.length || 0
    stats.value.quizzes = quizzesRes.data?.length || 0

    // Optional: get total enrolled students across all courses
    // const enrollRes = await api.get('/instructor/enrollments/count')
    // stats.value.students = enrollRes.data?.total || 0
  } catch (err) {
    console.log('Stats not fully loaded (normal on first login)', err)
  }
}

onMounted(() => {
  loadStats()
})
</script>