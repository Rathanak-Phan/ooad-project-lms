<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Student Dashboard</h1>

    <!-- Loading state -->
    <div v-if="loading" class="text-gray-500">Loading data...</div>

    <!-- Error state -->
    <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>

    <!-- Student Info -->
    <div v-if="student">
      <p><strong>Name:</strong> {{ student.name }}</p>
      <p><strong>Email:</strong> {{ student.email }}</p>
    </div>

    <!-- Courses -->
    <div v-if="courses.length">
      <h2 class="text-xl font-semibold mt-4">Enrolled Courses</h2>
      <ul>
        <li v-for="course in courses" :key="course.id" class="border p-2 my-1 rounded">
          {{ course.title }}
        </li>
      </ul>
    </div>

    <!-- Assignments -->
    <div v-if="assignments.length">
      <h2 class="text-xl font-semibold mt-4">Assignments</h2>
      <ul>
        <li v-for="assignment in assignments" :key="assignment.id" class="border p-2 my-1 rounded">
          {{ assignment.title }}
        </li>
      </ul>
    </div>

    <!-- Quizzes -->
    <div v-if="quizzes.length">
      <h2 class="text-xl font-semibold mt-4">Quizzes</h2>
      <ul>
        <li v-for="quiz in quizzes" :key="quiz.id" class="border p-2 my-1 rounded">
          {{ quiz.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import api from "../../utils/api";

export default {
  setup() {
    const student = ref(null);
    const courses = ref([]);
    const assignments = ref([]);
    const quizzes = ref([]);
    const loading = ref(true);
    const error = ref(null);

    const fetchStudentData = async () => {
      try {
        loading.value = true;
        const studentRes = await api.get("/student/me");
        student.value = studentRes.data;

        const coursesRes = await api.get("/student/courses");
        courses.value = coursesRes.data;

        const assignmentsRes = await api.get("/student/assignments");
        assignments.value = assignmentsRes.data;

        const quizzesRes = await api.get("/student/quizzes");
        quizzes.value = quizzesRes.data;

      } catch (err) {
        console.error(err);
        error.value = err.response?.data?.message || "Failed to load data.";
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchStudentData);

    return { student, courses, assignments, quizzes, loading, error };
  }
};
</script>
