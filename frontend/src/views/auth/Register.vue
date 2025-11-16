<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Register</h2>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-gray-700">Name</label>
          <input
            v-model="name"
            type="text"
            placeholder="Your Name"
            class="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label class="block text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="you@example.com"
            class="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label class="block text-gray-700">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="********"
            class="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label class="block text-gray-700">Role</label>
          <select
            v-model="role"
            class="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Register
        </button>
      </form>

      <p class="mt-4 text-sm text-center text-gray-600">
        Already have an account?
        <router-link to="/login" class="text-blue-500 hover:underline"
          >Login</router-link
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const role = ref("student");

const handleRegister = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/register", {
      name: name.value,
      email: email.value,
      password: password.value,
      role: role.value,
    });

    alert(res.data.message);
    router.push("/login"); // Redirect to login after registration
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Registration failed");
  }
};
</script>
