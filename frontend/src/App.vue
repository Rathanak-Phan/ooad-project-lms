<template>
  <div id="app">
    <Header v-if="!isAdminOrInstructorRoute" />
    <router-view />
    <Footer v-if="!isAdminOrInstructorRoute" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const route = useRoute()

const isAdminOrInstructorRoute = computed(() => {
  return route.path.startsWith('/admin') || route.path.startsWith('/instructor')
})
</script>