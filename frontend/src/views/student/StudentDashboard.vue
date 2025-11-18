<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50"
  >
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div
          class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mx-auto"
        ></div>
        <p class="mt-4 text-xl text-gray-600">Loading your dashboard...</p>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="flex items-center justify-center min-h-screen px-4"
    >
      <div
        class="bg-red-50 border-2 border-red-200 text-red-800 px-8 py-6 rounded-2xl max-w-md text-center"
      >
        <p class="text-2xl font-bold mb-2">Oops! Something went wrong</p>
        <p class="text-lg">{{ error }}</p>
        <button
          @click="fetchStudentData"
          class="mt-6 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition"
        >
          Try Again
        </button>
      </div>
    </div>

    <!-- Main Dashboard -->
    <div v-else class="max-w-7xl mx-auto px-6 py-12">
      <!-- Welcome Hero -->
      <div
        class="bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-3xl shadow-2xl p-10 mb-10 text-center"
      >
        <h1 class="text-5xl font-bold mb-4">
          Welcome back, {{ student.name }}!
        </h1>
        <p class="text-xl opacity-90">
          Ready to continue your learning journey?
        </p>
        <div class="mt-6 flex justify-center gap-4">
          <div class="bg-white/20 backdrop-blur px-6 py-3 rounded-full">
            <p class="text-2xl font-bold">{{ courses.length }}</p>
            <p class="text-sm opacity-90">Enrolled Courses</p>
          </div>
          <div class="bg-white/20 backdrop-blur px-6 py-3 rounded-full">
            <p class="text-2xl font-bold">
              {{ assignments.length + quizzes.length }}
            </p>
            <p class="text-sm opacity-90">Pending Tasks</p>
          </div>
        </div>
      </div>

      <!-- My Courses Section -->
      <section class="mb-12">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-3xl font-bold text-gray-800">My Courses</h2>
          <router-link
            to="/courses"
            class="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-2"
          >
            Browse All Courses
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </router-link>
        </div>

        <div
          v-if="courses.length === 0"
          class="bg-white rounded-2xl shadow-lg p-16 text-center"
        >
          <p class="text-2xl text-gray-600 mb-6">
            You haven't enrolled in any courses yet
          </p>
          <router-link
            to="/courses"
            class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition transform hover:scale-105"
          >
            Explore Courses
          </router-link>
        </div>

        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <div
            v-for="course in courses"
            :key="course.id"
            @click="$router.push(`/courses/${course.id}`)"
            class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
          >
            <!-- Course Thumbnail Placeholder -->
            <div
              class="bg-gradient-to-br from-indigo-400 to-purple-500 h-48 flex items-center justify-center"
            >
              <div class="text-white text-6xl font-bold opacity-30">
                {{ course.title.charAt(0) }}
              </div>
            </div>

            <div class="p-6">
              <h3 class="font-bold text-xl text-gray-800 mb-2 line-clamp-2">
                {{ course.title }}
              </h3>
              <p class="text-gray-600 text-sm mb-4">
                by {{ course.instructor?.name || "Instructor" }}
              </p>

              <!-- Progress Bar -->
              <div class="mb-4">
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-gray-600">Progress</span>
                  <span class="font-semibold text-indigo-600"
                    >{{ course.progress || 0 }}%</span
                  >
                </div>
                <div class="w-full bg-gray-200 rounded-full h-3">
                  <div
                    class="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                    :style="{ width: (course.progress || 0) + '%' }"
                  ></div>
                </div>
              </div>

              <button
                class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition"
              >
                Continue Learning
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Upcoming Tasks -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Assignments -->
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <h3
            class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"
          >
            Upcoming Assignments
          </h3>
          <div
            v-if="assignments.length === 0"
            class="text-center py-12 text-gray-500"
          >
            <p class="text-xl">No pending assignments</p>
            <p class="text-sm mt-2">Enjoy your free time!</p>
          </div>
          <ul v-else class="space-y-5">
            <li
              v-for="a in assignments"
              :key="a.id"
              class="flex items-start gap-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition cursor-pointer"
              @click="$router.push(`/student/assignment/${a.id}`)"
            >
              <div
                class="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0"
              >
                A
              </div>
              <div class="flex-1">
                <p class="font-semibold text-gray-800">{{ a.title }}</p>
                <p class="text-sm text-gray-600 mt-1">
                  Due: {{ formatDate(a.due_date) }}
                </p>
                <span
                  class="inline-block mt-2 px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full"
                >
                  Click to Submit
                </span>
              </div>
            </li>
          </ul>
        </div>

        <!-- Quizzes -->
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <h3
            class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"
          >
            Available Quizzes
          </h3>
          <div
            v-if="quizzes.length === 0"
            class="text-center py-12 text-gray-500"
          >
            <p class="text-xl">No quizzes available</p>
            <p class="text-sm mt-2">Check back soon!</p>
          </div>
          <ul v-else class="space-y-5">
            <li
              v-for="q in quizzes"
              :key="q.id"
              class="flex items-start gap-4 p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition"
            >
              <div
                class="bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0"
              >
                Q
              </div>
              <div class="flex-1">
                <p class="font-semibold text-gray-800">{{ q.title }}</p>
                <p class="text-sm text-gray-600 mt-1">
                  Available until: {{ formatDate(q.end_date) || "No deadline" }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "../../utils/api";

const router = useRouter();

// Keep your exact same logic
const student = ref(null);
const courses = ref([]);
const assignments = ref([]);
const quizzes = ref([]);
const loading = ref(true);
const error = ref(null);

const formatDate = (dateString) => {
  if (!dateString) return "No date";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const fetchStudentData = async () => {
  try {
    loading.value = true;
    error.value = null;

    const [studentRes, coursesRes, assignmentsRes, quizzesRes] =
      await Promise.all([
        api.get("/student/me"),
        api.get("/student/courses"),
        api.get("/student/assignments"),
        api.get("/student/quizzes"),
      ]);

    student.value = studentRes.data;
    courses.value = coursesRes.data || [];
    assignments.value = assignmentsRes.data || [];
    quizzes.value = quizzesRes.data || [];
  } catch (err) {
    console.error(err);
    if (err.response?.status === 401) {
      router.push("/login");
    } else {
      error.value = "Failed to load dashboard. Please check your connection.";
    }
  } finally {
    loading.value = false;
  }
};

onMounted(fetchStudentData);
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
