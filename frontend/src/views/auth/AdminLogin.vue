<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

      <!-- Logo / Image -->
      <div class="flex justify-center mb-6">
        <img
          src="https://static.vecteezy.com/system/resources/previews/019/194/935/original/global-admin-icon-color-outline-vector.jpg"
          alt="Admin Icon"
          class="w-32 h-32 object-cover drop-shadow-lg"
        />
      </div>

      <!-- Title -->
      <h2 class="text-3xl font-extrabold text-center text-gray-800 mb-6">
        Admin Login
      </h2>

      <!-- Error Box -->
      <div
        v-if="error"
        class="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm"
      >
        {{ error }}
      </div>

      <!-- Login Form -->
      <form @submit.prevent="submit" class="space-y-5">

        <div>
          <label class="block mb-1 text-gray-700 font-medium">Email</label>
          <input
            v-model="email"
            placeholder="Enter admin email"
            type="email"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div>
          <label class="block mb-1 text-gray-700 font-medium">Password</label>
          <input
            v-model="password"
            placeholder="Enter admin password"
            type="password"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <button
          class="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Login
        </button>
      </form>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../../utils/api";
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/userStore";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();
const userStore = useUserStore();

const submit = async () => {
  error.value = "";
  try {
    const { data } = await api.post("/auth/login", {
      email: email.value,
      password: password.value,
    });

    if (data.user.role !== "admin") {
      error.value = "Only admins can log in here.";
      return;
    }

    userStore.setUser(data.user, data.token);
    router.push("/admin");
  } catch (err) {
    error.value = err.response?.data?.message || "Login failed";
  }
};
</script>
