<template>
  <div class="min-h-screen flex bg-gray-100">
    <aside class="w-64 bg-white p-6 shadow">
      <h1 class="text-lg font-bold mb-6">E-Learning Admin</h1>
      <router-link to="/admin" class="block py-2">Dashboard</router-link>
      <router-link to="/admin/create-user" class="block py-2">Create User</router-link>
      <button @click="logout" class="mt-6 w-full bg-red-500 text-white py-2 rounded">Logout</button>
    </aside>

    <main class="flex-1 p-8">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">Dashboard</h2>
        <div>Welcome, <span class="font-semibold">{{ user.name }}</span></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div class="bg-white p-6 rounded shadow">
          <p class="text-sm text-gray-500">Students</p>
          <p class="text-3xl font-bold">{{ stats.students }}</p>
        </div>
        <div class="bg-white p-6 rounded shadow">
          <p class="text-sm text-gray-500">Instructors</p>
          <p class="text-3xl font-bold">{{ stats.instructors }}</p>
        </div>
        <div class="bg-white p-6 rounded shadow">
          <p class="text-sm text-gray-500">Admins</p>
          <p class="text-3xl font-bold">{{ stats.admins }}</p>
        </div>
      </div>

      <div class="bg-white p-6 rounded shadow">
        <h3 class="font-semibold mb-3">Recent Users</h3>
        <table class="w-full text-left">
          <thead><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead>
          <tbody>
            <tr v-for="u in users" :key="u.id" class="border-t">
              <td class="py-2">{{ u.name }}</td>
              <td class="py-2">{{ u.email }}</td>
              <td class="py-2">{{ u.role }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../../utils/api";
import { useUserStore } from "../../stores/userStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const user = userStore.user || JSON.parse(localStorage.getItem("user") || "{}");
const stats = ref({ students: 0, instructors: 0, admins: 0 });
const users = ref([]);

const router = useRouter();

const logout = () => {
  userStore.logout();
  router.push("/login");
};

const loadStats = async () => {
  try {
    const st = await api.get("/admin/stats");
    stats.value = st.data;
  } catch (err) {
    console.error(err);
  }
};

const loadUsers = async () => {
  try {
    const res = await api.get("/admin/users");
    users.value = res.data.users;
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  loadStats();
  loadUsers();
});
</script>
