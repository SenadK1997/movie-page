import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/movie/:code",
      name: "detailed-view",
      component: () => import("../views/DetailedView.vue"),
    },
    {
      path: "/show/:code",
      name: "detailed-show",
      component: () => import("../views/DetailedShow.vue"),
    },
  ],
});

export default router;
