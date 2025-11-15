import { createRouter, createWebHistory } from "vue-router";
import LoginForm from "../views/LoginForm.vue";
import RegisterForm from "../views/RegisterForm.vue"; // import your register page
import StudentDashboard from "../views/StudentDashboard.vue";
import InstructorDashboard from "../views/InstructorDashboard.vue";
import AdminDashboard from "../views/AdminDashboard.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", name: "Login", component: LoginForm },
  { path: "/register", name: "Register", component: RegisterForm }, // add this
  { path: "/student", name: "StudentDashboard", component: StudentDashboard },
  { path: "/instructor", name: "InstructorDashboard", component: InstructorDashboard },
  { path: "/admin", name: "AdminDashboard", component: AdminDashboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
