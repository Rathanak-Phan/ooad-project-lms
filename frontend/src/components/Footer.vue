<template>
  <footer class="bg-gray-900 text-gray-300">
    <div class="max-w-7xl mx-auto px-6 py-16 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        <!-- Brand & Description -->
        <div class="lg:col-span-2">
          <h2 class="text-2xl font-bold text-white mb-4">
            <span class="text-purple-500">Learn</span>Hub
          </h2>
          <p class="text-gray-400 text-sm leading-relaxed max-w-md">
            Empowering millions to learn new skills, advance their careers, and explore new horizons 
            with world-class courses from top instructors.
          </p>

          <!-- Social Icons -->
          <div class="flex space-x-5 mt-6">
            <a href="#" class="hover:text-white transition" aria-label="Facebook">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15h-2.5v-3H8v-2c0-2.76 1.68-4.28 4.12-4.28.74 0 2.12.17 2.12.17v2.33h-1.5c-1.17 0-1.54.73-1.54 1.47V12h2.62l-.42 3H13v6.8c4.56-.93 8-4.86 8-9.8z"/>
              </svg>
            </a>
            <a href="#" class="hover:text-white transition" aria-label="LinkedIn">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zm-.5 4.5h-1.7c-.5 0-1 .2-1.4.6-.4.4-.6.9-.6 1.6v1.4h3.1l-.4 3.1h-2.7v8.7h-3.3v-8.7H8.1v-3.1h2.4V9.3c0-1.2.3-2.2 1-3.1.7-.9 1.6-1.3 2.8-1.3h2.9V7.5z"/>
              </svg>
            </a>
            <a href="#" class="hover:text-white transition" aria-label="Twitter">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
              </svg>
            </a>
            <a href="#" class="hover:text-white transition" aria-label="YouTube">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-11.23 13.14v-8.28l7.65 4.14-7.65 4.14z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-white font-semibold mb-5">Quick Links</h3>
          <ul class="space-y-3 text-sm">
            <li><a href="#" class="hover:text-purple-400 transition">All Courses</a></li>
            <li><a href="#" class="hover:text-purple-400 transition">Become an Instructor</a></li>
            <li><a href="#" class="hover:text-purple-400 transition">Learning Paths</a></li>
            <li><a href="#" class="hover:text-purple-400 transition">Certificates</a></li>
            <li><a href="#" class="hover:text-purple-400 transition">Gift Cards</a></li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h3 class="text-white font-semibold mb-5">Company</h3>
          <ul class="space-y-3 text-sm">
            <li><a href="#" class="hover:text-purple-400 transition">About Us</a></li>
            <li><a href="#" class="hover:text-purple-400 transition">Careers</a></li>
            <li><a href="#" class="hover:text-purple-400 transition">Press & Media</a></li>
            <li><a href="#" class="hover:text-purple-400 transition">Blog</a></li>
            <li><a href="#" class="hover:text-purple-400 transition">Contact</a></li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h3 class="text-white font-semibold mb-5">Support</h3>
          <ul class="space-y-3 text-sm">
            <li><a href="#" class="hover:text-purple-400 transition">Help Center</a></li>
            <li><a href="#" class="hover:text-purple-400 transition">Privacy Policy</a></li>
            <li><a href="#" class="hover:text-purple-400 transition">Terms of Service</a></li>
            <li><a href="#" class="hover:text-purple-400 transition">Cookie Policy</a></li>
            <li><a href="#" class="hover:text-purple-400 transition">Accessibility</a></li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm">
        <p class="text-gray-500">
          © {{ new Date().getFullYear() }} LearnHub. All rights reserved.
        </p>

        <div class="flex items-center space-x-8 mt-4 md:mt-0">
          <span class="text-gray-500">Trusted by 5M+ learners worldwide</span>

          <!-- Option 1: Use real badge images (recommended) -->
          <!-- Put your SSL/Payment badges in public/assets/badges/ -->
          <div class="flex space-x-4">
            <img src="https://monsterhost.com/wp-content/uploads/2021/10/monsterhost-ssl-header.png" alt="SSL Secured" class="h-8 opacity-70">
            <img src="https://tse3.mm.bing.net/th/id/OIP.DZqphl156ZKM-l5GrvtFLQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Payment Methods" class="h-8 opacity-70">
          </div>

          <!-- Option 2: Simple text badges (no import errors) -->
          <!--
          <div class="flex space-x-4 text-xs font-medium">
            <span class="bg-gray-800 px-3 py-1 rounded">SSL Secured</span>
            <span class="bg-gray-800 px-3 py-1 rounded">100% Secure Payments</span>
          </div>
          -->
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// No script needed for a static footer
</script>