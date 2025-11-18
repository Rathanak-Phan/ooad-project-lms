<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-6">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="bg-white rounded-3xl shadow-2xl p-8 mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">{{ assignment.title }}</h1>
        <p class="text-lg text-gray-600 mb-6">{{ assignment.description }}</p>
        <div class="flex flex-wrap gap-6 text-sm">
          <div class="flex items-center gap-2">
            <span class="font-semibold">Due:</span>
            <span class="text-red-600 font-medium">{{ formatDate(assignment.due_date) }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-semibold">Course:</span>
            <span>{{ assignment.course?.title || "N/A" }}</span>
          </div>
        </div>
      </div>

      <!-- Already Submitted? -->
      <div v-if="submission" class="bg-green-50 border-2 border-green-300 rounded-2xl p-8 text-center mb-8">
        <h2 class="text-3xl font-bold text-green-800 mb-4">Submitted!</h2>
        <p class="text-lg text-green-700">You submitted on {{ formatDate(submission.submitted_at) }}</p>
        <p v-if="submission.grade" class="text-2xl font-bold text-green-800 mt-4">
          Grade: {{ submission.grade }}/100
        </p>
        <button @click="$router.push('/student')" class="mt-6 bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition">
          Back to Dashboard
        </button>
      </div>

      <!-- Submit Form -->
      <div v-else class="bg-white rounded-3xl shadow-2xl p-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Submit Your Assignment</h2>

        <!-- File Upload -->
        <div class="mb-8">
          <label class="block text-lg font-semibold text-gray-700 mb-4">Upload File</label>
          <div class="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-indigo-500 transition">
            <input type="file" @change="onFileChange" class="hidden" ref="fileInput" />
            <button @click="$refs.fileInput.click()" class="text-indigo-600 font-bold text-xl hover:underline">
              Click to upload
            </button>
            <p class="text-gray-500 mt-2">or drag and drop (PDF, DOCX, ZIP, etc.)</p>
            <p v-if="fileName" class="mt-4 text-green-600 font-bold text-lg">
              Selected: {{ fileName }}
            </p>
          </div>
        </div>

        <!-- Text Submission (optional) -->
        <div class="mb-8">
          <label class="block text-lg font-semibold text-gray-700 mb-4">Additional Notes (Optional)</label>
          <textarea
            v-model="notes"
            rows="5"
            placeholder="Write any message to your instructor..."
            class="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 transition resize-none"
          ></textarea>
        </div>

        <!-- Submit Button -->
        <div class="flex gap-4">
          <button
            @click="submitAssignment"
            :disabled="!file || submitting"
            class="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xl py-5 rounded-2xl hover:shadow-2xl transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!submitting">Submit Assignment</span>
            <span v-else class="flex items-center justify-center gap-3">
              <svg class="animate-spin h-6 w-6" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              Submitting...
            </span>
          </button>
          <button @click="$router.push('/student')" class="px-8 py-5 border-2 border-gray-300 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../../utils/api'

const route = useRoute()
const router = useRouter()
const assignmentId = route.params.id

const assignment = ref({})
const submission = ref(null)
const file = ref(null)
const fileName = ref('')
const notes = ref('')
const submitting = ref(false)

const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })

const onFileChange = (e) => {
  const selected = e.target.files[0]
  if (selected) {
    file.value = selected
    fileName.value = selected.name
  }
}

const submitAssignment = async () => {
  if (!file.value) return alert("Please upload a file")

  submitting.value = true
  const formData = new FormData()
  formData.append('file', file.value)
  if (notes.value) formData.append('notes', notes.value)

  try {
    const res = await api.post(`/student/assignment/${assignmentId}/submit`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    submission.value = res.data
    alert("Assignment submitted successfully!")
  } catch (err) {
    alert("Failed to submit: " + (err.response?.data?.message || err.message))
  } finally {
    submitting.value = false
  }
}

const loadAssignment = async () => {
  try {
    const [assignRes, subRes] = await Promise.all([
      api.get(`/student/assignment/${assignmentId}`),
      api.get(`/student/assignment/${assignmentId}/submission`)
    ])
    assignment.value = assignRes.data
    submission.value = subRes.data || null
  } catch (err) {
    if (err.response?.status === 404) router.push('/student')
  }
}

onMounted(loadAssignment)
</script>