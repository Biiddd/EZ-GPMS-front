import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";

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
    children: [
      {
        path: "/process",
        name: "process",
        component: () => import("@/views/Process.vue"),
      },
      {
        path: "/grade",
        name: "grade",
        component: () => import("@/views/Grade.vue"),
      },
      {
        path: "/info",
        name: "info",
        component: () => import("@/views/Info.vue"),
      },
      {
        path: "/editInfo",
        name: "editInfo",
        component: () => import("@/components/InfoEditor.vue"),
      },
      {
        path: "/changePasswd",
        name: "changePasswd",
        component: () => import("@/views/ChangePasswd.vue"),
      },
      {
        path: "/showStu",
        name: "showStu",
        component: () => import("@/views/ShowStuList.vue"),
      },
      {
        path: "/signScore",
        name: "signScore",
        component: () => import("@/views/SignScore.vue"),
      }
    ],
  },
  {
    path: "/teacherHome",
    name: "teacherHome",
    component: () => import("@/views/TeacherHome.vue"),
  }
];

const router = createRouter({
  history: createWebHistory("/home"),
  routes,
});

export default router;
