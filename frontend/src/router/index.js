import { createRouter, createWebHistory } from "vue-router";

import UserLogin from "../views/auth/UserLogin.vue";
import AdminLogin from "../views/auth/AdminLogin.vue";
import Register from "../views/auth/Register.vue";

import Home from "../views/Home.vue";
import StudentDashboard from "../views/student/StudentDashboard.vue";
import InstructorDashboard from "../views/instructor/InstructorDashboard.vue";
import AdminDashboard from "../views/admin/AdminDashboard.vue";

import Courses from "../views/instructor/Courses.vue";
import Assignments from "../views/instructor/Assignments.vue";
import Quizzes from "../views/instructor/Quizzes.vue";
import Profile from "../views/instructor/Profile.vue";
import AdminCreateUser from "../views/admin/AdminCreateUser.vue";
import AllUsers from "../views/admin/AllUsers.vue";
import Setting from "../views/admin/Setting.vue";
import NotFound from "../components/NotFound.vue";
import StudentAssignmentSubmit from "../views/student/StudentAssignmentSubmit.vue";

const routes = [
  // ---- Student Home Page ----
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { role: "student" },
  },

  // Public
  { path: "/login", name: "Login", component: UserLogin },
  { path: "/admin/login", name: "AdminLogin", component: AdminLogin },
  { path: "/register", name: "Register", component: Register },

  // Student dashboard
  {
    path: "/student/",
    name: "StudentDashboard",
    component: StudentDashboard,
    meta: { role: "student" },
  },
  {
    path: "/student/assignment/:id",
    name: "StudentAssignmentSubmit",
    component: StudentAssignmentSubmit,
  },

  // Instructor
  {
    path: "/instructor/",
    name: "InstructorDashboard",
    component: InstructorDashboard,
    meta: { role: "instructor", hideLayout: true },
    children: [
      { path: "", component: () => import("../views/instructor/Overview.vue") },
      { path: "courses", component: Courses },
      { path: "assignments", component: Assignments },
      { path: "quizzes", component: Quizzes },
      { path: "profile", component: Profile },
    ],
  },

  // Admin
  {
    path: "/admin",
    name: "AdminDashboard",
    component: AdminDashboard,
    meta: { role: "admin", hideLayout: true },
    children: [
      { path: "", component: () => import("../views/admin/Overview.vue") },
      { path: "/admin/create-user", component: AdminCreateUser },
      { path: "/admin/users", component: AllUsers },
      { path: "/admin/settings", component: Setting },
    ],
  },

  // 404 fallback route
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Role protection
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (to.path === "/login" && user && token) {
    // Already logged in → redirect based on role
    if (user.role === "student") return next("/");
    if (user.role === "instructor") return next("/instructor/dashboard");
    if (user.role === "admin") return next("/admin");
  }

  if (to.meta.role) {
    if (!user || !token) return next("/login");

    if (to.meta.role !== user.role) {
      if (user.role === "student") return next("/");
      if (user.role === "instructor") return next("/instructor/dashboard");
      if (user.role === "admin") return next("/admin");
      return next("/login");
    }
  }

  next();
});

export default router;
