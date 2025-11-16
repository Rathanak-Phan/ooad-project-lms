<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-md">
      <div class="p-6 text-2xl font-bold text-gray-800">Instructor</div>
      <nav class="mt-6">
        <ul>
          <li class="mb-3">
            <router-link
              to="/instructor/"
              class="block py-2 px-4 rounded hover:bg-gray-200"
            >Overview</router-link>
          </li>
          <li class="mb-3">
            <router-link
              to="/instructor/courses"
              class="block py-2 px-4 rounded hover:bg-gray-200"
            >Courses</router-link>
          </li>
          <li class="mb-3">
            <router-link
              to="/instructor/assignments"
              class="block py-2 px-4 rounded hover:bg-gray-200"
            >Assignments</router-link>
          </li>
          <li class="mb-3">
            <router-link
              to="/instructor/quizzes"
              class="block py-2 px-4 rounded hover:bg-gray-200"
            >Quizzes</router-link>
          </li>
          <li>
            <router-link
              to="/instructor/profile"
              class="block py-2 px-4 rounded hover:bg-gray-200"
            >Profile</router-link>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="flex justify-between items-center p-4 bg-white shadow">
        <h1 class="text-2xl font-semibold">Instructor Dashboard</h1>
        <button
          @click="logout"
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </header>

      <!-- Dashboard Content -->
      <main class="flex-1 p-6">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "InstructorDashboard",
  methods: {
    logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
/* Optional custom styles */
</style>
