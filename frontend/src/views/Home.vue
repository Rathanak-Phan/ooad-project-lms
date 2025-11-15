<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <!-- Header -->
    <header class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800">
        Welcome, {{ user.name }}!
      </h1>
      <button
        @click="logout"
        class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </header>

    <!-- Role-based Content -->
    <div v-if="user.role === 'student'" class="space-y-4">
      <h2 class="text-xl font-semibold">Student Dashboard</h2>
      <p>Here you can view your enrolled courses and start learning.</p>
      <ul class="list-disc ml-6">
        <li v-for="course in courses" :key="course.id">{{ course.title }}</li>
      </ul>
    </div>

    <div v-else-if="user.role === 'instructor'" class="space-y-4">
      <h2 class="text-xl font-semibold">Instructor Dashboard</h2>
      <p>Here you can manage your courses and upload new lessons.</p>
      <ul class="list-disc ml-6">
        <li v-for="course in courses" :key="course.id">{{ course.title }}</li>
      </ul>
    </div>

    <div v-else-if="user.role === 'admin'" class="space-y-4">
      <h2 class="text-xl font-semibold">Admin Dashboard</h2>
      <p>Manage users, courses, and platform settings.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "Guest",
        role: "student", // default, replace after login
      },
      courses: [
        { id: 1, title: "Web Development" },
        { id: 2, title: "Data Structures & Algorithms" },
        { id: 3, title: "Database Systems" },
      ],
    };
  },
  created() {
    // Load user info from localStorage (set during login)
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user"));

    if (token && userData) {
      this.user = userData;
    } else {
      // If no user, redirect to login
      this.$router.push("/login");
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
/* Optional styling */
</style>
