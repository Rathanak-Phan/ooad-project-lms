<template>
  <div class="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow mt-10">
    <h2 class="text-2xl font-bold mb-6">Create Quiz</h2>

    <form @submit.prevent="submitQuiz" class="space-y-6">
      <!-- Quiz Info -->
      <div class="space-y-4">
        <div>
          <label class="block mb-1 font-medium">Quiz Title</label>
          <input
            v-model="title"
            type="text"
            placeholder="Enter quiz title"
            class="w-full border px-3 py-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label class="block mb-1 font-medium">Quiz Description</label>
          <textarea
            v-model="description"
            placeholder="Enter quiz description"
            class="w-full border px-3 py-2 rounded-lg"
          ></textarea>
        </div>
      </div>

      <!-- Questions -->
      <div>
        <h3 class="text-xl font-semibold mb-4">Questions</h3>

        <div
          v-for="(q, index) in questions"
          :key="index"
          class="border p-4 rounded-lg mb-4 space-y-3"
        >
          <div>
            <input
              v-model="q.question"
              placeholder="Enter question text"
              class="w-full border px-3 py-2 rounded-lg"
              required
            />
          </div>

          <div
            v-for="(opt, i) in q.options"
            :key="i"
            class="flex items-center mb-2 space-x-2"
          >
            <input
              v-model="q.options[i]"
              placeholder="Option text"
              class="flex-1 border px-3 py-2 rounded-lg"
              required
            />
            <label class="flex items-center space-x-1">
              <input
                type="radio"
                :name="'answer-' + index"
                :value="i"
                v-model="q.correct"
              />
              <span class="text-sm">Correct</span>
            </label>
          </div>

          <button
            type="button"
            @click="removeQuestion(index)"
            class="text-red-600 hover:underline"
          >
            Remove Question
          </button>
        </div>

        <button
          type="button"
          @click="addQuestion"
          class="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
        >
          + Add Question
        </button>
      </div>

      <!-- Submit -->
      <div>
        <button
          type="submit"
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create Quiz
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import api from "../../utils/api"; // ✅ import api

export default {
  data() {
    return {
      title: "",
      description: "",
      questions: [],
    };
  },
  methods: {
    addQuestion() {
      this.questions.push({
        question: "",
        options: ["", "", "", ""],
        correct: 0,
      });
    },
    removeQuestion(index) {
      this.questions.splice(index, 1);
    },
    async submitQuiz() {
      try {
        if (!this.questions.length) {
          alert("Please add at least one question.");
          return;
        }

        // Create Quiz
        const res = await api.post("/instructor/quiz", {
          title: this.title,
          description: this.description,
        });
        const quizId = res.data.id;

        // Add Questions
        for (const q of this.questions) {
          await api.post(`/instructor/quiz/${quizId}/question`, {
            question: q.question,
            options: q.options,
            answer: q.options[q.correct],
          });
        }

        alert("Quiz created successfully!");
        this.$router.push("/instructor/");
      } catch (err) {
        console.error("Error creating quiz:", err.response || err);
        alert("Error creating quiz, please try again.");
      }
    },
  },
};
</script>
