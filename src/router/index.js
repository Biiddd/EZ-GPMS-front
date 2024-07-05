import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import StuProcess from '@/views/stu/StuProcess.vue';
import SignScore from '@/views/teach/SignScore.vue';
import Login from '@/views/Login.vue';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/home',
    children: [
      {
        path: '/process',
        name: 'process',
        component: StuProcess
      },
      {
        path: '/grade',
        name: 'grade',
        component: () => import('@/views/stu/GradeTable.vue')
      },
      {
        path: '/info',
        name: 'info',
        component: () => import('@/views/Info.vue')
      },
      {
        path: '/editInfo',
        name: 'editInfo',
        component: () => import('@/components/InfoEditor.vue')
      },
      {
        path: '/changePasswd',
        name: 'changePasswd',
        component: () => import('@/views/ChangePasswd.vue')
      },
      {
        path: '/showStu',
        name: 'showStu',
        component: () => import('@/views/teach/ShowStuList.vue')
      },
      {
        path: '/uploadRequire',
        name: 'uploadRequire',
        component: () => import('@/views/teach/UploadRequirement.vue')
      },
      {
        path: '/groupArrange',
        name: 'groupArrange',
        component: () => import('@/components/GroupArrange.vue')
      },
      {
        path: '/signScore',
        name: 'signScore',
        component: SignScore
      }
    ]
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/common/403.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/common/404.vue')
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

export default router;
