<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <form
      @submit.prevent="register"
      class="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
    >
      <h2 class="text-2xl font-bold mb-6 text-center">Register</h2>

      <div class="mb-4">
        <label class="block text-gray-700 mb-1">Name</label>
        <input
          v-model="name"
          type="text"
          placeholder="Your name"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 mb-1">Email</label>
        <input
          v-model="email"
          type="email"
          placeholder="you@example.com"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 mb-1">Password</label>
        <input
          v-model="password"
          type="password"
          placeholder="********"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div class="mb-6">
        <label class="block text-gray-700 mb-1">Role</label>
        <select
          v-model="role"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
        </select>
      </div>

      <button
        type="submit"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors"
      >
        Register
      </button>
    </form>
  </div>
</template>

<script>
import api from "../utils/api.js";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      role: "student",
    };
  },
  methods: {
    async register() {
      try {
        const res = await api.post("/auth/register", {
          name: this.name,
          email: this.email,
          password: this.password,
          role: this.role,
        });
        console.log("Registration success:", res.data);
        alert("Registered successfully!");
      } catch (err) {
        console.error("Registration error:", err.response?.data || err);
        alert("Registration failed: " + (err.response?.data?.message || err.message));
      }
    },
  },
};
</script>
