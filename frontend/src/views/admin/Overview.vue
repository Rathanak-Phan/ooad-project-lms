<template>
  <div class="min-h-screen bg-gray-50 py-8 px-6">
    <!-- Header -->
    <div class="mb-10">
      <h1 class="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
      <p class="mt-2 text-lg text-gray-600">Manage users, monitor activity, and control the platform</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <!-- Student Card -->
      <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 rounded-2xl shadow-xl hover:scale-105 transition">
        <p class="text-blue-100 text-sm font-medium">Total Students</p>
        <p class="text-4xl font-bold mt-2">{{ stats.students }}</p>
      </div>

      <!-- Instructor Card -->
      <div class="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 rounded-2xl shadow-xl hover:scale-105 transition">
        <p class="text-green-100 text-sm font-medium">Instructors</p>
        <p class="text-4xl font-bold mt-2">{{ stats.instructors }}</p>
      </div>

      <!-- Admin Card -->
      <div class="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-8 rounded-2xl shadow-xl hover:scale-105 transition">
        <p class="text-purple-100 text-sm font-medium">Admins</p>
        <p class="text-4xl font-bold mt-2">{{ stats.admins }}</p>
      </div>

      <!-- Total Users Card -->
      <div class="bg-gradient-to-r from-orange-500 to-red-600 text-white p-8 rounded-2xl shadow-xl hover:scale-105 transition">
        <p class="text-orange-100 text-sm font-medium">All Users</p>
        <p class="text-4xl font-bold mt-2">{{ stats.total }}</p>
      </div>
    </div>

    <!-- Users Table -->
    <div class="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      <div class="px-8 py-6 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h2 class="text-2xl font-bold text-gray-800">Recent Users</h2>
        <router-link
          to="/admin/create-user"
          class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition"
        >
          + Create User
        </router-link>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full min-w-max">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="text-left py-4 px-6 font-semibold text-gray-700">User</th>
              <th class="text-left py-4 px-6 font-semibold text-gray-700">Role</th>
              <th class="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
              <th class="text-left py-4 px-6 font-semibold text-gray-700">Joined</th>
              <th class="text-center py-4 px-6 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 transition">
              <!-- Avatar + Name/Email -->
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    {{ (user.name || user.email || 'U')[0].toUpperCase() }}
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ user.name || 'Unnamed' }}</p>
                    <p class="text-sm text-gray-500">{{ user.email }}</p>
                  </div>
                </div>
              </td>

              <!-- Role Badge -->
              <td class="py-4 px-6">
                <span
                  class="px-3 py-1 rounded-full text-xs font-medium"
                  :class="{
                    'bg-purple-100 text-purple-800': user.role === 'admin',
                    'bg-green-100 text-green-800': user.role === 'instructor',
                    'bg-blue-100 text-blue-800': user.role === 'student',
                    'bg-gray-100 text-gray-800': !user.role
                  }"
                >
                  {{ user.role || 'unknown' }}
                </span>
              </td>

              <!-- Status Badge -->
              <td class="py-4 px-6">
                <span
                  class="px-3 py-1 rounded-full text-xs font-medium"
                  :class="user.disabled ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'"
                >
                  {{ user.disabled ? 'Disabled' : 'Active' }}
                </span>
              </td>

              <!-- Joined Date -->
              <td class="py-4 px-6 text-sm text-gray-500">
                {{ formatDate(user.createdAt) }}
              </td>

              <!-- Actions -->
              <td class="py-4 px-6 text-center">
                <div class="flex items-center justify-center gap-4">
                  <button
                    @click="toggleUser(user)"
                    :disabled="toggling"
                    class="text-sm font-medium transition"
                    :class="user.disabled ? 'text-green-600 hover:text-green-800' : 'text-orange-600 hover:text-orange-800'"
                  >
                    {{ toggling ? '...' : (user.disabled ? 'Enable' : 'Disable') }}
                  </button>
                  <button
                    @click="deleteUser(user)"
                    :disabled="deleting"
                    class="text-sm font-medium text-red-600 hover:text-red-800 transition"
                  >
                    {{ deleting ? 'Deleting...' : 'Delete' }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="users.length === 0" class="text-center py-16 text-gray-500 text-lg">
          No users found.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../../utils/api'

const users = ref([])
const stats = ref({ students: 0, instructors: 0, admins: 0, total: 0 })
const toggling = ref(false)
const deleting = ref(false)

const formatDate = (date) => {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const loadData = async () => {
  try {
    const [statsRes, usersRes] = await Promise.all([
      api.get('/admin/stats'),
      api.get('/admin/users?limit=15')
    ])

    const s = statsRes.data
    stats.value = {
      students: s.students || 0,
      instructors: s.instructors || 0,
      admins: s.admins || 0,
      total: (s.students || 0) + (s.instructors || 0) + (s.admins || 0)
    }

    users.value = usersRes.data.users || usersRes.data || []
  } catch (err) {
    console.error('Failed to load admin data:', err)
  }
}

const toggleUser = async (user) => {
  if (!confirm(`Are you sure you want to ${user.disabled ? 'ENABLE' : 'DISABLE'} this user?`)) return
  toggling.value = true
  try {
    await api.patch(`/admin/user/${user.id}/toggle`)
    user.disabled = !user.disabled
  } catch (err) {
    alert('Failed to update user status')
  } finally {
    toggling.value = false
  }
}

const deleteUser = async (user) => {
  if (!confirm(`PERMANENTLY delete "${user.email}"? This cannot be undone!`)) return
  deleting.value = true
  try {
    await api.delete(`/admin/user/${user.id}`)
    users.value = users.value.filter(u => u.id !== user.id)
  } catch (err) {
    alert('Failed to delete user')
  } finally {
    deleting.value = false
  }
}

onMounted(loadData)
</script>

<style scoped>
table { min-width: 900px; }
</style>