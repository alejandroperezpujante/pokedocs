import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import SearchView from "@/views/SearchView.vue";
import AuthView from "@/views/AuthView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "search",
      component: SearchView,
      meta: { requiresAuth: true },
    },
    {
      path: "/create",
      name: "create",
      component: () => import("@/views/CreateView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/AboutView.vue"),
    },
    {
      path: "/auth",
      name: "auth",
      component: AuthView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/NotFound.vue"),
    },
  ],
});

router.beforeEach((to) => {
  const user = useAuthStore();
  if (to.meta.requiresAuth && !user.token) {
    router.push("/auth");
  }
});

export default router;
