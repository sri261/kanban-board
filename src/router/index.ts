import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LogInView from "../views/LogInView.vue";
import { checkIfTokenExists } from "../services/authService.js";
import DefaultLayout from "../components/layout/DefaultLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LogInView,
    },
    {
      path: "/",
      component: DefaultLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "home",
          component: HomeView,
        },
      ],
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
