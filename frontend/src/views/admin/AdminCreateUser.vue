<template>
  <div class="min-h-screen flex items-start justify-center p-8 bg-gray-100">
    <div class="bg-white p-6 rounded shadow w-full max-w-xl">
      <h2 class="text-2xl font-bold mb-4">Create New User</h2>

      <div v-if="success" class="p-3 bg-green-100 text-green-700 rounded mb-3">{{ success }}</div>
      <div v-if="error" class="p-3 bg-red-100 text-red-700 rounded mb-3">{{ error }}</div>

      <form @submit.prevent="create" class="space-y-4">
        <input v-model="form.name" placeholder="Full name" class="w-full p-3 border rounded" />
        <input v-model="form.email" placeholder="Email" class="w-full p-3 border rounded" />
        <input v-model="form.password" type="password" placeholder="Password" class="w-full p-3 border rounded" />

        <select v-model="form.role" class="w-full p-3 border rounded">
          <option value="">-- Select role --</option>
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
          <option value="admin">Admin</option>
        </select>

        <button class="w-full bg-blue-600 text-white p-3 rounded">Create User</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../../utils/api";

const form = ref({ name: "", email: "", password: "", role: "" });
const success = ref("");
const error = ref("");

const create = async () => {
  success.value = "";
  error.value = "";
  if (!form.value.name || !form.value.email || !form.value.password || !form.value.role) {
    error.value = "All fields required";
    return;
  }
  try {
    // Use admin endpoint (requires admin token)
    const res = await api.post("/admin/create-user", form.value);
    success.value = res.data.message || "User created";
    form.value = { name: "", email: "", password: "", role: "" };
  } catch (err) {
    error.value = err.response?.data?.message || "Error creating user";
  }
};
</script>
