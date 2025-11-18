<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-md flex flex-col">
      <div class="p-6 text-2xl font-bold text-gray-800 border-b">Admin Panel</div>
      <nav class="mt-6 flex-1">
        <ul>
          <li class="mb-2">
            <router-link
              to="/admin/"
              class="block py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors"
              :class="{ 'bg-gray-200 font-semibold': $route.path === '/admin/' }"
            >Dashboard</router-link>
          </li>
          <li class="mb-2">
            <router-link
              to="/admin/create-user"
              class="block py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors"
              :class="{ 'bg-gray-200 font-semibold': $route.path === '/admin/create-user' }"
            >Create User</router-link>
          </li>
          <li class="mb-2">
            <router-link
              to="/admin/users"
              class="block py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors"
              :class="{ 'bg-gray-200 font-semibold': $route.path === '/admin/users' }"
            >All Users</router-link>
          </li>
          <li class="mb-2">
            <router-link
              to="/admin/settings"
              class="block py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors"
              :class="{ 'bg-gray-200 font-semibold': $route.path === '/admin/settings' }"
            >Settings</router-link>
          </li>
        </ul>
      </nav>
      <button
        @click="logout"
        class="m-6 mt-auto bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors"
      >
        Logout
      </button>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="flex justify-between items-center p-6 bg-white shadow">
        <h1 class="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <div class="text-gray-700">
          Welcome, <span class="font-semibold">{{ userName }}</span>
        </div>
      </header>

      <!-- Dashboard Content -->
      <main class="flex-1 p-6 overflow-auto space-y-6">

        <!-- Dynamic Content -->
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "../../utils/api";

const router = useRouter();
const userName = ref(JSON.parse(localStorage.getItem("user") || "{}").name || "Admin");
const stats = ref({ students: 0, instructors: 0, admins: 0 });

function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  router.push("/login");
}

// Load stats for cards
onMounted(async () => {
  try {
    const res = await api.get("/admin/stats");
    stats.value = res.data;
  } catch (err) {
    console.error("Failed to load stats:", err);
  }
});
</script>

<style scoped>
/* Custom scrollbar for main content */
main::-webkit-scrollbar {
  width: 6px;
}
main::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

/* Smooth transition for hover effects */
.block, button {
  transition: all 0.2s ease-in-out;
}
</style>
