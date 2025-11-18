<template>
  <div class="home-page bg-gray-50 min-h-screen">
    <!-- Hero Section -->
    <section class="hero-section bg-white py-20">
      <div class="container mx-auto px-6">
        <div class="flex items-center justify-between">
          <div class="w-1/2">
            <h1 class="text-5xl font-bold text-gray-900 mb-4">
              Getting Quality<br/>
              Education Is Now<br/>
              More Easy
            </h1>
            <p class="text-gray-600 mb-6">
              Exceptional Learning Experiences Personalized Path
            </p>
            <div class="flex space-x-4">
              <button 
                @click="handleGetStarted"
                class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Get Started
              </button>
              <button 
                @click="scrollToSection('features')"
                class="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100 transition"
              >
                Learn More
              </button>
            </div>
          </div>
          <div class="w-1/2 flex justify-center">
            <div class="w-96 h-96 bg-purple-100 rounded-full flex items-center justify-center">
              <svg class="w-64 h-64 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section py-12 bg-gray-100">
      <div class="container mx-auto px-6 text-center">
        <p class="text-gray-600 mb-8">
          The most preferred online learning platform for learners<br/>
          who wish to take their learning to the next level
        </p>
      </div>
    </section>

    <!-- Features Cards -->
    <section id="features" class="features-section py-16 bg-white">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-2 gap-6 mb-8">
          <div 
            v-for="feature in mainFeatures" 
            :key="feature.id"
            class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition cursor-pointer"
          >
            <div class="flex items-start space-x-4">
              <div :class="`w-12 h-12 ${feature.iconBg} rounded-lg flex items-center justify-center`">
                <span class="text-2xl">{{ feature.icon }}</span>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-2">{{ feature.title }}</h3>
                <p class="text-gray-600 text-sm">{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Courses -->
    <section class="courses-section py-16 bg-gray-50">
      <div class="container mx-auto px-6">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-3xl font-bold text-gray-900">Popular Courses</h2>
          <button 
            @click="viewAllCourses"
            class="text-blue-600 hover:underline"
          >
            View All
          </button>
        </div>
        
        <div class="grid grid-cols-4 gap-6">
          <div 
            v-for="course in courses" 
            :key="course.id"
            class="bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition cursor-pointer"
            @click="viewCourseDetail(course.id)"
          >
            <div class="h-40 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <span class="text-white text-4xl">📚</span>
            </div>
            <div class="p-4">
              <span class="inline-block bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full mb-2">
                {{ course.category }}
              </span>
              <h4 class="font-semibold text-gray-900 mb-2">{{ course.title }}</h4>
              <div class="flex items-center justify-between">
                <div class="flex items-center text-yellow-500 text-sm">
                  <span>⭐</span>
                  <span class="ml-1">{{ course.rating }}</span>
                </div>
                <span class="text-gray-600 text-sm">{{ course.students }} students</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination dots -->
        <div class="flex justify-center space-x-2 mt-8">
          <span 
            v-for="dot in 5" 
            :key="dot"
            :class="dot === currentPage ? 'bg-blue-600' : 'bg-gray-300'"
            class="w-2 h-2 rounded-full cursor-pointer hover:bg-blue-400 transition"
            @click="currentPage = dot"
          ></span>
        </div>
      </div>
    </section>

    <!-- Practice Section -->
    <section class="practice-section py-16 bg-white">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-2 gap-12">
          <div class="flex items-center">
            <div>
              <h2 class="text-3xl font-bold text-gray-900 mb-4">
                Practice with<br/>
                Real Exam Questions
              </h2>
              <p class="text-gray-600 mb-6">
                Prepare yourself with thousands of practice questions designed to help you succeed in your exams and certifications.
              </p>
              <button 
                @click="startPractice"
                class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Start Practice
              </button>
            </div>
          </div>
          <div class="flex justify-center items-center">
            <div class="w-full h-80 bg-blue-50 rounded-lg flex items-center justify-center">
              <span class="text-6xl">💻</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Invest Section -->
    <section class="invest-section py-16 bg-gray-50">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-2 gap-12">
          <div class="flex justify-center items-center">
            <div class="w-full h-80 bg-green-50 rounded-lg flex items-center justify-center">
              <span class="text-6xl">📈</span>
            </div>
          </div>
          <div class="flex items-center">
            <div>
              <h2 class="text-3xl font-bold text-gray-900 mb-4">
                Invest yourself in<br/>
                learning knowledge
              </h2>
              <p class="text-gray-600 mb-6">
                Build your skills and invest in your future. Access world-class education from anywhere, anytime.
              </p>
              <button 
                @click="learnMore"
                class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Path to Success -->
    <section class="path-section py-16 bg-white">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-2 gap-12">
          <div class="flex items-center">
            <div>
              <h2 class="text-3xl font-bold text-gray-900 mb-4">
                Follow a Learning Path<br/>
                to global success.
              </h2>
              <p class="text-gray-600 mb-6">
                Choose from structured learning paths designed to take you from beginner to expert in your chosen field.
              </p>
              <button 
                @click="explorePaths"
                class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Explore Paths
              </button>
            </div>
          </div>
          <div class="flex justify-center items-center">
            <div class="w-full h-80 bg-yellow-50 rounded-lg flex items-center justify-center">
              <span class="text-6xl">🎯</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Roadmap Section -->
    <section class="roadmap-section py-16 bg-gray-50">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-2 gap-12">
          <div class="flex justify-center items-center">
            <div class="w-full h-80 bg-purple-50 rounded-lg flex items-center justify-center">
              <span class="text-6xl">🗺️</span>
            </div>
          </div>
          <div class="flex items-center">
            <div>
              <h2 class="text-3xl font-bold text-gray-900 mb-4">
                Check our career roadmap<br/>
                for learning courses.
              </h2>
              <p class="text-gray-600 mb-6">
                Navigate your career journey with our comprehensive roadmaps for different tech careers.
              </p>
              <button 
                @click="viewRoadmap"
                class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                View Roadmap
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Active Learning -->
    <section class="active-learning py-16 bg-white">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-2 gap-12">
          <div class="flex items-center">
            <div>
              <h2 class="text-3xl font-bold text-gray-900 mb-4">
                Active learning<br/>
                community
              </h2>
              <p class="text-gray-600 mb-6">
                Join thousands of learners in our active community. Share knowledge, ask questions, and grow together.
              </p>
              <button 
                @click="joinCommunity"
                class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Join Community
              </button>
            </div>
          </div>
          <div class="flex justify-center items-center">
            <div class="w-full h-80 bg-pink-50 rounded-lg flex items-center justify-center">
              <span class="text-6xl">👥</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stay Updated -->
    <section class="stay-updated py-16 bg-gray-50">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-2 gap-12">
          <div class="flex justify-center items-center">
            <div class="w-full h-80 bg-indigo-50 rounded-lg flex items-center justify-center">
              <span class="text-6xl">📰</span>
            </div>
          </div>
          <div class="flex items-center">
            <div>
              <h2 class="text-3xl font-bold text-gray-900 mb-4">
                Stay up to date<br/>
                with the latest<br/>
                news and updates.
              </h2>
              <p class="text-gray-600 mb-6">
                Never miss important updates about new courses, features, and learning opportunities.
              </p>
              <button 
                @click="subscribe"
                class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonial -->
    <section class="testimonial-section py-16 bg-white">
      <div class="container mx-auto px-6 text-center">
        <div class="max-w-3xl mx-auto">
          <div class="mb-8">
            <span class="text-6xl">💎</span>
          </div>
          <p class="text-xl text-gray-700 mb-6 italic">
            "Studying on this online platform has been a game-changer for me. 
            The courses are well-structured, and the instructors are knowledgeable. 
            I can learn at my own pace, which fits perfectly with my busy schedule."
          </p>
          <p class="font-semibold text-gray-900">Sarah Thompson</p>
          <p class="text-gray-600">Web Developer</p>
        </div>
      </div>
    </section>

    <!-- Testimonial 2 -->
    <section class="testimonial-section-2 py-16 bg-gray-50">
      <div class="container mx-auto px-6 text-center">
        <div class="max-w-3xl mx-auto">
          <div class="mb-8">
            <span class="text-6xl">🎯</span>
          </div>
          <p class="text-xl text-gray-700 mb-6 italic">
            "The quality of education here is outstanding. I've completed multiple courses 
            and each one has exceeded my expectations. Highly recommended!"
          </p>
          <p class="font-semibold text-gray-900">Michael Chen</p>
          <p class="text-gray-600">Data Scientist</p>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="pricing-section py-16 bg-white">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
          Choose Your Plan
        </h2>
        
        <div class="grid grid-cols-4 gap-6">
          <div 
            v-for="plan in pricingPlans" 
            :key="plan.id"
            :class="plan.popular ? 'border-2 border-blue-600 transform scale-105' : 'border border-gray-200'"
            class="bg-white rounded-lg p-6 hover:shadow-lg transition cursor-pointer"
            @click="selectPlan(plan.id)"
          >
            <span v-if="plan.popular" class="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full mb-4">
              Most Popular
            </span>
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ plan.name }}</h3>
            <p class="text-3xl font-bold text-gray-900 mb-4">
              ${{ plan.price }}
              <span class="text-sm text-gray-600 font-normal">/{{ plan.period }}</span>
            </p>
            <ul class="space-y-3 mb-6">
              <li v-for="(feature, index) in plan.features" :key="index" class="flex items-start">
                <span class="text-green-500 mr-2">✓</span>
                <span class="text-gray-600 text-sm">{{ feature }}</span>
              </li>
            </ul>
            <button 
              :class="plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border border-gray-300 text-gray-700 hover:bg-gray-100'"
              class="w-full py-2 rounded-lg transition"
            >
              Choose Plan
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Section -->
    <section class="why-choose-section py-16 bg-gray-50">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
          Why You Choose E-edu Education Platform
        </h2>
        
        <div class="grid grid-cols-3 gap-8">
          <div 
            v-for="reason in whyChoose" 
            :key="reason.id"
            class="text-center"
          >
            <div class="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span class="text-3xl">{{ reason.icon }}</span>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">{{ reason.title }}</h3>
            <p class="text-gray-600 text-sm">{{ reason.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="newsletter-section py-16 bg-white">
      <div class="container mx-auto px-6">
        <div class="bg-gray-900 rounded-2xl p-12 text-center text-white">
          <h2 class="text-3xl font-bold mb-4">Subscribe to our Newsletter</h2>
          <p class="text-gray-300 mb-8">Get the latest updates and news right in your inbox</p>
          <div class="flex justify-center">
            <input 
              v-model="newsletterEmail"
              type="email" 
              placeholder="Enter your email"
              class="px-6 py-3 rounded-l-lg w-96 text-gray-900 focus:outline-none"
            />
            <button 
              @click="subscribeNewsletter"
              class="bg-blue-600 px-8 py-3 rounded-r-lg hover:bg-blue-700 transition"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  
  data() {
    return {
      currentPage: 1,
      newsletterEmail: '',
      
      mainFeatures: [
        {
          id: 1,
          icon: '🎓',
          iconBg: 'bg-blue-100',
          title: 'Expert Instructions',
          description: 'Learn from industry experts with years of experience in their respective fields.'
        },
        {
          id: 2,
          icon: '📱',
          iconBg: 'bg-red-100',
          title: 'Mobile Learning',
          description: 'Access your courses anytime, anywhere from any device with our mobile app.'
        },
        {
          id: 3,
          icon: '📚',
          iconBg: 'bg-yellow-100',
          title: 'Unlimited Access',
          description: 'Get unlimited access to thousands of courses with a single subscription.'
        },
        {
          id: 4,
          icon: '🏆',
          iconBg: 'bg-green-100',
          title: 'Certification',
          description: 'Earn certificates upon completion to showcase your new skills.'
        }
      ],
      
      courses: [
        {
          id: 1,
          title: 'Web Development Bootcamp',
          category: 'Popular',
          rating: 4.8,
          students: '1.2k'
        },
        {
          id: 2,
          title: 'UI/UX Design Masterclass',
          category: 'Popular',
          rating: 4.9,
          students: '980'
        },
        {
          id: 3,
          title: 'Data Science Fundamentals',
          category: 'Popular',
          rating: 4.7,
          students: '1.5k'
        },
        {
          id: 4,
          title: 'Digital Marketing Course',
          category: 'Popular',
          rating: 4.6,
          students: '850'
        }
      ],
      
      pricingPlans: [
        {
          id: 1,
          name: 'Basic',
          price: 0,
          period: 'month',
          popular: false,
          features: [
            'Access to free courses',
            'Basic support',
            'Community access',
            'Certificate of completion'
          ]
        },
        {
          id: 2,
          name: 'Premium',
          price: 29,
          period: 'month',
          popular: true,
          features: [
            'Access to all courses',
            'Priority support',
            'Community access',
            'Certificate of completion',
            'Downloadable resources',
            'Live sessions'
          ]
        },
        {
          id: 3,
          name: 'Pro',
          price: 49,
          period: 'month',
          popular: false,
          features: [
            'Everything in Premium',
            '1-on-1 mentorship',
            'Career guidance',
            'Job placement support',
            'Lifetime access'
          ]
        },
        {
          id: 4,
          name: 'Enterprise',
          price: 99,
          period: 'month',
          popular: false,
          features: [
            'Everything in Pro',
            'Custom learning paths',
            'Team management',
            'Analytics dashboard',
            'Dedicated support'
          ]
        }
      ],
      
      whyChoose: [
        {
          id: 1,
          icon: '📖',
          title: 'Best Courses',
          description: 'High-quality courses designed by industry professionals'
        },
        {
          id: 2,
          icon: '👨‍🏫',
          title: 'Expert Teachers',
          description: 'Learn from experienced instructors with proven expertise'
        },
        {
          id: 3,
          icon: '📜',
          title: 'Certification',
          description: 'Earn recognized certificates to boost your career'
        }
      ]
    };
  },
  
  methods: {
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
    
    handleGetStarted() {
      // Check if user is logged in
      const token = localStorage.getItem("token");
      if (token) {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData.role === 'student') {
          this.$router.push('/student/');
        } else if (userData.role === 'instructor') {
          this.$router.push('/instructor/');
        } else if (userData.role === 'admin') {
          this.$router.push('/admin');
        }
      } else {
        this.$router.push('/login');
      }
    },
    
    viewAllCourses() {
      this.$router.push('/courses');
    },
    
    viewCourseDetail(courseId) {
      this.$router.push(`/courses/${courseId}`);
    },
    
    startPractice() {
      console.log('Start practice clicked');
      // Add navigation logic
    },
    
    learnMore() {
      this.scrollToSection('features');
    },
    
    explorePaths() {
      console.log('Explore paths clicked');
      // Add navigation logic
    },
    
    viewRoadmap() {
      console.log('View roadmap clicked');
      // Add navigation logic
    },
    
    joinCommunity() {
      console.log('Join community clicked');
      // Add navigation logic
    },
    
    subscribe() {
      this.scrollToSection('newsletter');
    },
    
    selectPlan(planId) {
      console.log('Selected plan:', planId);
      // Add plan selection logic
    },
    
    subscribeNewsletter() {
      if (this.newsletterEmail) {
        console.log('Subscribed email:', this.newsletterEmail);
        alert('Thank you for subscribing!');
        this.newsletterEmail = '';
      } else {
        alert('Please enter a valid email address');
      }
    }
  }
};
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}

.container {
  max-width: 1200px;
}

html {
  scroll-behavior: smooth;
}
</style>