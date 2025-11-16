<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div class="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
        <h2 class="text-lg font-semibold text-gray-700">Courses</h2>
        <p class="text-4xl font-bold text-blue-600">{{ stats.courses }}</p>
      </div>

      <div class="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
        <h2 class="text-lg font-semibold text-gray-700">Assignments</h2>
        <p class="text-4xl font-bold text-green-600">{{ stats.assignments }}</p>
      </div>

      <div class="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
        <h2 class="text-lg font-semibold text-gray-700">Quizzes</h2>
        <p class="text-4xl font-bold text-purple-600">{{ stats.quizzes }}</p>
      </div>
    </div>

    <!-- Panels -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Assignments -->
      <div class="bg-white p-6 rounded-xl shadow space-y-4">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-800">Recent Assignments</h2>
          <button
            @click="createAssignment"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Create Assignment
          </button>
        </div>

        <ul class="divide-y">
          <li
            v-for="assignment in assignments"
            :key="assignment.id"
            class="py-3 flex justify-between items-center"
          >
            <span class="font-medium text-gray-700">{{ assignment.title }}</span>
            <button class="text-blue-600 hover:underline">Edit</button>
          </li>
        </ul>

        <button
          @click="goAllAssignments"
          class="w-full mt-4 text-center text-blue-600 hover:underline"
        >
          View All Assignments →
        </button>
      </div>

      <!-- Quizzes -->
      <div class="bg-white p-6 rounded-xl shadow space-y-4">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-800">Recent Quizzes</h2>
          <button
            @click="createQuiz"
            class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            + Create Quiz
          </button>
        </div>

        <ul class="divide-y">
          <li
            v-for="quiz in quizzes"
            :key="quiz.id"
            class="py-3 flex justify-between items-center"
          >
            <span class="font-medium text-gray-700">{{ quiz.title }}</span>
            <button class="text-green-600 hover:underline">Edit</button>
          </li>
        </ul>

        <button
          @click="goAllQuizzes"
          class="w-full mt-4 text-center text-green-600 hover:underline"
        >
          View All Quizzes →
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../utils/api"; 

export default {
  data() {
    return {
      stats: {
        courses: 0,
        assignments: 0,
        quizzes: 0,
      },
      assignments: [],
      quizzes: [],
    };
  },
  async created() {
    await this.loadDashboardData();
  },
  methods: {
    async loadDashboardData() {
      try {
        const [assignmentsRes, quizzesRes, coursesRes] = await Promise.all([
          api.get("/instructor/assignments"),
          api.get("/instructor/quizzes"),
          api.get("/instructor/courses/count"),
        ]);

        // Set assignments & quizzes
        this.assignments = assignmentsRes.data || [];
        this.quizzes = quizzesRes.data || [];

        // Stats counts
        this.stats.assignments = this.assignments.length;
        this.stats.quizzes = this.quizzes.length;
        this.stats.courses = coursesRes.data.courses || 0;
      } catch (err) {
        console.error(
          "Dashboard Loading Error:",
          err.response?.data || err.message
        );
      }
    },

    createAssignment() {
      this.$router.push("/instructor/assignments");
    },
    createQuiz() {
      this.$router.push("/instructor/quizzes");
    },
    goAllAssignments() {
      this.$router.push("/instructor/assignments");
    },
    goAllQuizzes() {
      this.$router.push("/instructor/quizzes");
    },
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>
