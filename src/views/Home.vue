<script lang="ts" setup>
import { ref } from 'vue';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  LockOutlined,
  FormOutlined,
} from '@ant-design/icons-vue';
import { getUserInfo } from '@/utils/auth';
import { RouterLink } from 'vue-router';
import { setLogout } from '@/utils/auth';
import router from '@/router/index.js';
const selectedKeys2 = ref<string[]>(['1']);
const openKeys = ref<string[]>(['sub1']);
const handleLogout = async () => {
  setLogout(); // 调用退出登录函数

  // 跳转到登录页面
  await router.push({ name: 'login' });
};
</script>

<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="logo" />

      <div class="header-right">
        <a-dropdown>
         <template #overlay>
            <a-menu>
              <a-menu-item key="profile">
                <router-link to="/profile">个人中心</router-link>
              </a-menu-item>
              <a-menu-item key="logout" @click="handleLogout">
                <router-link to="/logout">退出登录</router-link>
              </a-menu-item>
            </a-menu>
          </template>
          <a class="ant-dropdown-link" onclick="e => e.preventDefault()">
            <a-avatar size="small" icon="UserOutlined" />
          </a>
        </a-dropdown>
      </div>

    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <a-layout style="padding: 24px 0; background: #fff">
        <a-layout-sider width="200" style="background: #fff">
          <a-menu
            v-model:selectedKeys="selectedKeys2"
            v-model:openKeys="openKeys"
            mode="inline"
            style="height: 100%">
            <a-menu-item key="0">
              <user-outlined />
              <router-link to="/overview">概览</router-link>
            </a-menu-item>

            <a-menu-item key="1" v-if="getUserInfo().user_type === '学生'">
              <user-outlined />
              <router-link to="/process">进度</router-link>
            </a-menu-item>

            <a-menu-item key="2" v-if="getUserInfo().user_type === '学生'">
              <router-link to="/grade">
                <laptop-outlined />
                成绩
              </router-link>
            </a-menu-item>

            <a-menu-item
              key="3"
              v-if="
                getUserInfo().user_type === '指导教师' ||
                getUserInfo().user_type === '小组秘书兼评阅教师' ||
                getUserInfo().user_type === '组长'
              ">
              <router-link to="/showStu">
                <laptop-outlined />
                学生列表
              </router-link>
            </a-menu-item>

            <a-menu-item
              key="4"
              v-if="
                getUserInfo().user_type === '指导教师' ||
                getUserInfo().user_type === '小组秘书兼评阅教师' ||
                getUserInfo().user_type === '组长'
              ">
              <router-link to="/signScore">
                <laptop-outlined />
                打分页面
              </router-link>
            </a-menu-item>

            <a-menu-item key="5" v-if="getUserInfo().user_type === '指导教师'">
              <router-link to="/uploadRequire">
                <laptop-outlined />
                要求上传
              </router-link>
            </a-menu-item>

            <a-menu-item key="6" v-if="getUserInfo().user_type === '管理员'">
              <router-link to="/groupArrange">
                <laptop-outlined />
                分组情况
              </router-link>
            </a-menu-item>

            <a-sub-menu key="sub2" v-if="getUserInfo().user_type === '管理员'">
              <template #title>
                <span>
                  <notification-outlined />
                  学生
                </span>
              </template>

              <a-menu-item key="11">
                <router-link to="/stuInfo">
                  <user-outlined />
                  学生基本信息
                </router-link>
              </a-menu-item>

              <a-menu-item key="12">
                <router-link to="/showStu">
                  <FormOutlined />
                  学生成绩汇总
                </router-link>
              </a-menu-item>
            </a-sub-menu>

            <a-sub-menu key="sub3" v-if="getUserInfo().user_type === '管理员'">
              <template #title>
                <span>
                  <notification-outlined />
                  教师
                </span>
              </template>

              <a-menu-item key="31">
                <router-link to="/teacherInfo">
                  <user-outlined />
                  教师基本信息
                </router-link>
              </a-menu-item>
            </a-sub-menu>

            <a-sub-menu key="sub1">
              <template #title>
                <span>
                  <notification-outlined />
                  个人空间
                </span>
              </template>

              <a-menu-item key="11">
                <router-link to="/info">
                  <user-outlined />
                  基本信息
                </router-link>
              </a-menu-item>

              <a-menu-item key="12">
                <router-link to="/editInfo">
                  <FormOutlined />
                  修改信息
                </router-link>
              </a-menu-item>

              <a-menu-item key="13">
                <router-link to="/changePasswd">
                  <LockOutlined />
                  修改密码
                </router-link>
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </a-layout-sider>
        <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>

<style scoped>
.header-right {
  float: right;
  display: flex;
  align-items: center;
  height: 100%;
}
#components-layout-demo-top-side .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>
