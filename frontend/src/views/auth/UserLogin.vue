<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-4">Login for user</h2>

      <div v-if="error" class="mb-3 p-3 bg-red-100 text-red-700 rounded">
        {{ error }}
      </div>

      <form @submit.prevent="submit" class="space-y-4">
        <input
          v-model="email"
          placeholder="Email"
          type="email"
          class="w-full p-3 border rounded"
        />
        <input
          v-model="password"
          placeholder="Password"
          type="password"
          class="w-full p-3 border rounded"
        />

        <button class="w-full bg-blue-600 text-white p-3 rounded">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/userStore";
import api from "../../utils/api";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();
const userStore = useUserStore();

// Redirect if already logged in
onMounted(() => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (userData && token) {
    // Redirect automatically based on role
    if (userData.role === "student") router.replace("/");
    else if (userData.role === "instructor")
      router.replace("/instructor/dashboard");
    else if (userData.role === "admin") router.replace("/admin");
  }
});

const submit = async () => {
  error.value = "";
  try {
    const { data } = await api.post("/auth/login", {
      email: email.value,
      password: password.value,
    });

    userStore.setUser(data.user, data.token);

    // Redirect based on role
    if (data.user.role === "student") router.replace("/");
    else if (data.user.role === "instructor")
      router.replace("/instructor/");
    else if (data.user.role === "admin") router.replace("/admin");
  } catch (err) {
    error.value = err.response?.data?.message || "Login failed";
  }
};
</script>
