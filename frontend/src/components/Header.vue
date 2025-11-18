<template>
  <div class="bg-gray-900 text-white fixed w-full">
    <!-- Main Navbar -->
    <header class="bg-blue-900 shadow-lg">
      <div class="px-4 sm:px-6 lg:px-8 py-3">
        <div class="flex items-center justify-between">

          <!-- Left: Logo + Nav -->
          <div class="flex items-center">
            <!-- Mobile menu button -->
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="lg:hidden p-2 rounded-md hover:bg-blue-800">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Logo -->
            <router-link to="/" class="ml-2 lg:ml-0 text-2xl font-bold tracking-tight">
              E-edu
            </router-link>

            <!-- Desktop Navigation -->
            <nav class="hidden lg:flex items-center ml-10 space-x-1">
              <!-- Explore Dropdown -->
              <div class="relative">
                <button @click="toggleDropdown('explore')"
                  class="flex items-center space-x-2 px-4 py-2.5 rounded-lg hover:bg-blue-800 transition">
                  <span class="font-medium">Explore</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div v-if="dropdowns.explore"
                  class="absolute left-0 mt-2 w-60 bg-white rounded-xl shadow-2xl text-gray-800 z-50 overflow-hidden">
                  <a v-for="item in exploreItems" :key="item.id" href="#"
                    @click.prevent="handleMenuClick(item.name); closeAllDropdowns()"
                    class="block px-5 py-3 hover:bg-gray-100 transition first:rounded-t-xl last:rounded-b-xl">
                    {{ item.name }}
                  </a>
                </div>
              </div>

              <router-link to="/student/" @click="closeAllDropdowns"
                class="px-5 py-2.5 rounded-lg hover:bg-blue-800 transition font-medium">
                My Courses
              </router-link>

              <button class="px-5 py-2.5 rounded-lg hover:bg-blue-800 transition font-medium">
                Docs
              </button>
              <button class="px-5 py-2.5 rounded-lg hover:bg-blue-800 transition font-medium">
                Certificates
              </button>
            </nav>
          </div>

          <!-- Right Section -->
          <div class="flex items-center space-x-4">

            <button class="hidden sm:block text-gray-300 hover:text-white transition text-sm">
              For Teachers
            </button>

            <!-- Notifications -->
            <div class="relative">
              <button @click="toggleDropdown('notifications')"
                class="p-2.5 hover:bg-blue-800 rounded-full transition relative">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span v-if="unreadCount > 0"
                  class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              </button>

              <div v-if="dropdowns.notifications"
                class="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl text-gray-800 z-50 overflow-hidden">
                <div class="px-5 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  <h3 class="font-bold text-lg">Notifications</h3>
                </div>
                <div class="max-h-96 overflow-y-auto">
                  <div v-for="n in notifications" :key="n.id"
                    @click="handleNotificationClick(n.id)"
                    class="px-5 py-4 hover:bg-gray-50 transition cursor-pointer border-b last:border-0">
                    <p class="font-semibold text-sm">{{ n.title }}</p>
                    <p class="text-xs text-gray-600 mt-1">{{ n.message }}</p>
                    <p class="text-xs text-gray-400 mt-2">{{ n.time }}</p>
                  </div>
                  <div v-if="!notifications.length" class="py-10 text-center text-gray-500">
                    No new notifications
                  </div>
                </div>
              </div>
            </div>

            <!-- User Avatar Dropdown (Logged In) -->
            <div v-if="userStore.user" class="relative">
              <button @click="toggleDropdown('user')"
                class="flex items-center space-x-3 hover:bg-blue-800 px-3 py-2 rounded-xl transition">
                <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-lg shadow-md ring-2 ring-white/20">
                  {{ userStore.user.name.charAt(0).toUpperCase() }}
                </div>
                <span class="hidden sm:block font-medium">{{ userStore.user.name.split(' ')[0] }}</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div v-if="dropdowns.user"
                class="absolute right-0 mt-3 w-72 bg-white rounded-b-xl shadow-2xl text-gray-800 z-50 overflow-hidden">
                <div class="px-6 py-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                  <p class="font-bold text-xl">{{ userStore.user.name }}</p>
                  <p class="text-sm opacity-90">{{ userStore.user.email }}</p>
                </div>
                <div class="p-3 space-y-1">
                  <router-link to="/student/profile" @click="closeAllDropdowns"
                    class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span class="font-medium">My Profile</span>
                  </router-link>
                  <router-link to="/student/settings" @click="closeAllDropdowns"
                    class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span class="font-medium">Settings</span>
                  </router-link>
                  <div class="border-t pt-2 mt-2">
                    <button @click="logout"
                      class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span class="font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Not Logged In -->
            <div v-else class="flex items-center space-x-3">
              <button @click="handleSignIn"
                class="bg-white text-blue-900 px-5 py-2.5 rounded-xl font-bold hover:bg-gray-100 transition shadow-md">
                Sign In
              </button>
              <button @click="handleRegister"
                class="bg-blue-700 px-5 py-2.5 rounded-xl font-bold hover:bg-blue-600 transition shadow-md">
                Register
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div v-if="mobileMenuOpen" class="lg:hidden mt-4 pb-4 border-t border-blue-800 pt-4">
          <div class="space-y-2">
            <router-link to="/student/" @click="mobileMenuOpen = false"
              class="block px-4 py-3 rounded-lg hover:bg-blue-800 transition font-medium">
              My Courses
            </router-link>
            <button class="w-full text-left px-4 py-3 rounded-lg hover:bg-blue-800 transition font-medium">
              Docs
            </button>
            <button class="w-full text-left px-4 py-3 rounded-lg hover:bg-blue-800 transition font-medium">
              Certificates
            </button>
            <button class="w-full text-left px-4 py-3 rounded-lg hover:bg-blue-800 transition text-gray-300">
              For Teachers
            </button>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { useUserStore } from "../stores/userStore"
import { useRouter } from "vue-router"

export default {
  name: "NavbarComponent",
  setup() {
    const userStore = useUserStore()
    const router = useRouter()

    const logout = () => {
      userStore.logout()
      router.replace("/login")
    }

    return { userStore, logout }
  },

  data() {
    return {
      mobileMenuOpen: false,
      dropdowns: {
        explore: false,
        notifications: false,
        user: false,  // ← This was missing!
      },
      exploreItems: [
        { id: 1, name: "All Courses" },
        { id: 2, name: "Programming" },
        { id: 3, name: "Design" },
        { id: 4, name: "Business" },
        { id: 5, name: "Marketing" },
      ],
      notifications: [
        { id: 1, title: "New course available", message: "Check out the latest web development course", time: "2 hours ago", read: false },
        { id: 2, title: "Assignment due soon", message: "Your assignment is due in 2 days", time: "5 hours ago", read: false },
        { id: 3, title: "Certificate earned!", message: "Congratulations on completing the course", time: "1 day ago", read: true },
      ],
    }
  },

  computed: {
    unreadCount() {
      return this.notifications.filter(n => !n.read).length
    }
  },

  methods: {
    toggleDropdown(name) {
      Object.keys(this.dropdowns).forEach(key => {
        if (key !== name) this.dropdowns[key] = false
      })
      this.dropdowns[name] = !this.dropdowns[name]
    },
    closeAllDropdowns() {
      Object.keys(this.dropdowns).forEach(key => this.dropdowns[key] = false)
      this.mobileMenuOpen = false
    },
    handleMenuClick(itemName) {
      console.log("Menu clicked:", itemName)
      this.closeAllDropdowns()
    },
    handleNotificationClick(id) {
      const n = this.notifications.find(x => x.id === id)
      if (n) n.read = true
    },
    handleSignIn() {
      this.$router.push("/login")
    },
    handleRegister() {
      this.$router.push("/register")
    },
    handleClickOutside(e) {
      if (!e.target.closest(".relative") && !e.target.closest("button")) {
        this.closeAllDropdowns()
      }
    }
  },

  mounted() {
    document.addEventListener("click", this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside)
  }
}
</script>

<style scoped>
/* Optional: smooth backdrop blur on dropdowns */
.bg-white {
  backdrop-filter: blur(12px);
}
</style>