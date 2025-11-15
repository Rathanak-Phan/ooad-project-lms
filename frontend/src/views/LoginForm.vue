<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500"
  >
    <!-- Card -->
    <div class="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
      <!-- Logo -->
      <div class="flex justify-center mb-6">
        <img src="https://avatars.githubusercontent.com/u/173990272?v=4" alt="Logo" class="w-20 h-20 object-contain" />
      </div>

      <!-- Title -->
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">
        Welcome Back
      </h2>

      <!-- Form -->
      <form @submit.prevent="login" class="space-y-5">
        <!-- Email -->
        <div>
          <label for="email" class="block text-gray-600 mb-1">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="w-full px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          />
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block text-gray-600 mb-1"
            >Password</label
          >
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Enter your password"
            class="w-full px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition"
        >
          Login
        </button>
      </form>

      <!-- Signup Link -->
      <p class="mt-5 text-center text-gray-500 text-sm">
        Don't have an account?
        <router-link to="/register" class="text-blue-500 hover:underline"
          >Sign up</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import api from "../utils/api.js";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async login() {
      try {
        const res = await api.post("/auth/login", {
          email: this.email,
          password: this.password,
        });

        // Store JWT and user info
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        const role = res.data.user.role;

        // Redirect based on role
        if (role === "student") {
          this.$router.push({ name: "StudentDashboard" });
        } else if (role === "instructor") {
          this.$router.push({ name: "InstructorDashboard" });
        } else if (role === "admin") {
          this.$router.push({ name: "AdminDashboard" });
        }
      } catch (err) {
        console.error("Login error:", err.response?.data || err);
        alert("Login failed: " + (err.response?.data || err.message));
      }
    },
  },
};
</script>
