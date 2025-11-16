<template>
  <div class="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow mt-10">
    <h2 class="text-2xl font-bold mb-6">Create Assignment</h2>

    <form @submit.prevent="submitAssignment" class="space-y-4">
      <div>
        <label class="block mb-1">Title</label>
        <input
          v-model="title"
          type="text"
          placeholder="Assignment title"
          class="w-full border px-3 py-2 rounded-lg"
          required
        />
      </div>

      <div>
        <label class="block mb-1">Description</label>
        <textarea
          v-model="description"
          placeholder="Assignment description"
          class="w-full border px-3 py-2 rounded-lg"
          required
        ></textarea>
      </div>

      <div>
        <label class="block mb-1">Due Date</label>
        <input
          v-model="dueDate"
          type="datetime-local"
          class="w-full border px-3 py-2 rounded-lg"
          required
        />
      </div>

      <button
        type="submit"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Create Assignment
      </button>
    </form>
  </div>
</template>

<script>
import api from "../../utils/api"; 
export default {
  data() {
    return {
      title: "",
      description: "",
      dueDate: "",
    };
  },

  methods: {
    async submitAssignment() {
      try {
        const res = await api.post("/instructor/assignment", {
          title: this.title,
          description: this.description,
          due_date: this.dueDate,
        });

        alert("Assignment created successfully!");
        this.$router.push("/instructor/");
      } catch (err) {
        console.error("Create Error:", err.response || err);
        alert("Failed to create assignment.");
      }
    },
  },
};
</script>
