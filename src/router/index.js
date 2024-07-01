import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "default",
    component: Home,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    redirect: "/home",
    meta: { requiresAuth: true },
    children: [
      {
        path: "/process",
        name: "process",
        component: () => import("../views/Process.vue"),
      },
      {
        path: "/grade",
        name: "grade",
        component: () => import("../views/Grade.vue"),
      },
      {
        path: "/editInfo",
        name: "editInfo",
        component: () => import("../components/InfoEditor.vue"),
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory("/home"),
  routes,
});

export default router;
