import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/BoardView.vue";
import LogInView from "../views/LogInView.vue";
import BoardsView from "../views/BoardsView.vue";

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
          path: "/boards",
          name: "boards",
          component: BoardsView,
        },
        {
          path: "/board/:id",
          name: "board",
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
