<template>
  <div class="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow mt-10">
    <h2 class="text-2xl font-bold mb-6">Create New Course</h2>

    <form @submit.prevent="submitCourse" class="space-y-4">
      <div>
        <label class="block mb-1 font-medium">Course Title</label>
        <input
          v-model="title"
          type="text"
          placeholder="Enter course title"
          class="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div>
        <label class="block mb-1 font-medium">Course Description</label>
        <textarea
          v-model="description"
          placeholder="Enter course description"
          class="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        {{ loading ? "Creating..." : "Create Course" }}
      </button>
    </form>
  </div>
</template>

<script>
import api from "../../utils/api"; // make sure the path is correct

export default {
  data() {
    return {
      title: "",
      description: "",
      loading: false,
    };
  },
  methods: {
    async submitCourse() {
      if (!this.title.trim() || !this.description.trim()) {
        alert("Please fill in all fields.");
        return;
      }

      this.loading = true;

      try {
        const res = await api.post("/instructor/courses", {
          title: this.title,
          description: this.description,
        });

        alert("Course created successfully!");
        // Reset form
        this.title = "";
        this.description = "";
        this.$router.push("/instructor/courses");
      } catch (err) {
        console.error("Error creating course:", err.response?.data || err);
        const message = err.response?.data?.message || "Failed to create course.";
        alert(message);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
