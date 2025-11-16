<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <!-- Header -->
    <header class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800">
        Welcome, {{ user.name }} 👋
      </h1>

      <button
        @click="logout"
        class="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
      >
        Logout
      </button>
    </header>

    <!-- Student Home Section -->
    <section v-if="user.role === 'student'" class="space-y-8">
      <!-- Student Intro -->
      <div class="bg-white p-6 rounded-xl shadow">
        <h2 class="text-xl font-semibold mb-2">Student Home</h2>
        <p class="text-gray-600">
          Continue your learning journey! View your enrolled courses or go to your dashboard.
        </p>

        <button
          @click="$router.push('/student/dashboard')"
          class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          Go to Student Dashboard →
        </button>
      </div>

      <!-- Sample Courses -->
      <div class="bg-white p-6 rounded-xl shadow">
        <h3 class="text-lg font-bold mb-4">Your Courses</h3>
        <ul class="space-y-2">
          <li
            v-for="course in courses"
            :key="course.id"
            class="p-3 bg-gray-50 rounded border hover:bg-gray-100 transition"
          >
            {{ course.title }}
          </li>
        </ul>
      </div>

      <!-- Announcements -->
      <div class="bg-white p-6 rounded-xl shadow">
        <h3 class="text-lg font-bold mb-4">Announcements</h3>
        <p class="text-gray-600">📢 No announcements yet. Stay tuned!</p>
      </div>
    </section>

    <!-- Instructor Home -->
    <section v-else-if="user.role === 'instructor'" class="space-y-8">
      <div class="bg-white p-6 rounded-xl shadow">
        <h2 class="text-xl font-semibold">Instructor Home</h2>
        <p class="text-gray-600">
          Manage your courses and create new learning materials.
        </p>
        <button
          @click="$router.push('/instructor/dashboard')"
          class="mt-4 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
        >
          Go to Instructor Dashboard →
        </button>
      </div>
    </section>

    <!-- Admin Home -->
    <section v-else-if="user.role === 'admin'" class="space-y-8">
      <div class="bg-white p-6 rounded-xl shadow">
        <h2 class="text-xl font-semibold">Admin Home</h2>
        <p class="text-gray-600">
          Manage users, courses, reports, and platform settings.
        </p>

        <button
          @click="$router.push('/admin')"
          class="mt-4 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
        >
          Go to Admin Dashboard →
        </button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "Guest",
        role: "student",
      },
      courses: [
        { id: 1, title: "Web Development" },
        { id: 2, title: "Data Structures & Algorithms" },
        { id: 3, title: "Database Systems" },
      ],
    };
  },
  created() {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user"));

    if (token && userData) {
      this.user = userData;
    } else {
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
