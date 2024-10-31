import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LogInView from "../views/LogInView.vue";
import { checkIfTokenExists } from "../services/authService.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: LogInView,
    },
  ],
});

export default router;

router.beforeEach((to, from, next) => {
  if (!checkIfTokenExists() && to.meta.requiresAuth) {
    next({ name: "login" });
  } else {
    next();
  }
});
