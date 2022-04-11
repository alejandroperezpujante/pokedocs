import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/about",
    },
    {
      path: "/search",
      component: () => import("@/views/SearchView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/create",
      component: () => import("@/views/CreateView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/profile",
      component: () => import("@/views/ProfileView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/about",
      component: () => import("@/views/AboutView.vue"),
    },
    {
      path: "/register",
      component: () => import("@/views/RegisterView.vue"),
    },
    {
      path: "/login",
      component: () => import("@/views/LoginView.vue"),
    },

    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/NotFound.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.user) {
    next("/login");
  } else {
    next();
  }
});

export default router;
