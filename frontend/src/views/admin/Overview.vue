<template>
  <div class="space-y-6">
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
        <p class="text-gray-500">Students</p>
        <p class="text-3xl font-bold text-blue-600">{{ stats.students }}</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
        <p class="text-gray-500">Instructors</p>
        <p class="text-3xl font-bold text-green-600">{{ stats.instructors }}</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
        <p class="text-gray-500">Admins</p>
        <p class="text-3xl font-bold text-purple-600">{{ stats.admins }}</p>
      </div>
    </div>

    <!-- Recent Users Table -->
    <div class="bg-white p-6 rounded-xl shadow">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Recent Users</h2>
        <router-link
          to="/admin/create-user"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Create User
        </router-link>
      </div>
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-100">
            <th class="py-2 px-4 border-b">Name</th>
            <th class="py-2 px-4 border-b">Email</th>
            <th class="py-2 px-4 border-b">Role</th>
            <th class="py-2 px-4 border-b">Joined</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in recentUsers"
            :key="user.id"
            class="hover:bg-gray-50"
          >
            <td class="py-2 px-4 border-b">{{ user.name }}</td>
            <td class="py-2 px-4 border-b">{{ user.email }}</td>
            <td class="py-2 px-4 border-b">{{ user.role }}</td>
            <td class="py-2 px-4 border-b">{{ formatDate(user.createdAt) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Recent Courses -->
    <div class="bg-white p-6 rounded-xl shadow">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Recent Courses</h2>
        <router-link
          to="/admin/courses"
          class="text-blue-600 hover:underline"
        >
          View All
        </router-link>
      </div>
      <ul class="divide-y">
        <li
          v-for="course in recentCourses"
          :key="course.id"
          class="py-3 flex justify-between items-center"
        >
          <span class="font-medium text-gray-700">{{ course.title }}</span>
          <span class="text-gray-500">{{ formatDate(course.createdAt) }}</span>
        </li>
      </ul>
    </div>

    <!-- Recent Activities -->
    <div class="bg-white p-6 rounded-xl shadow">
      <h2 class="text-xl font-semibold mb-3">Recent Activities</h2>
      <ul class="divide-y">
        <li
          v-for="activity in recentActivities"
          :key="activity.id"
          class="py-2 text-gray-700"
        >
          {{ activity.message }} - <span class="text-gray-400">{{ formatDate(activity.date) }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../../utils/api";

const stats = ref({ students: 0, instructors: 0, admins: 0 });
const recentUsers = ref([]);
const recentCourses = ref([]);
const recentActivities = ref([]);

// Format date nicely
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString() + " " + d.toLocaleTimeString();
}

onMounted(async () => {
  try {
    // Stats
    const statsRes = await api.get("/admin/stats");
    stats.value = statsRes.data;

    // Recent users
    const usersRes = await api.get("/admin/users?limit=5"); // get latest 5 users
    recentUsers.value = usersRes.data.users;

    // Recent courses
    const coursesRes = await api.get("/admin/courses?limit=5");
    recentCourses.value = coursesRes.data.courses;

    // Recent activities
    const activitiesRes = await api.get("/admin/activities?limit=5");
    recentActivities.value = activitiesRes.data.activities;
  } catch (err) {
    console.error("Error loading admin overview:", err);
  }
});
</script>

<style scoped>
/* Optional scrollbar for table */
table::-webkit-scrollbar {
  height: 6px;
}
table::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}
</style>
