<script lang="ts" setup>
import { ref } from "vue";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  LockOutlined,
  FormOutlined,
} from "@ant-design/icons-vue";

const selectedKeys2 = ref<string[]>(["1"]);
const openKeys = ref<string[]>(["sub1"]);
</script>

<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="logo" />
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <a-layout style="padding: 24px 0; background: #fff">
        <a-layout-sider width="200" style="background: #fff">
          <a-menu
              v-model:selectedKeys="selectedKeys2"
              v-model:openKeys="openKeys"
              mode="inline"
              style="height: 100%"
          >
            <a-menu-item key="sub1">
              <user-outlined />
              <router-link to="/process">学生列表</router-link>
            </a-menu-item>

            <a-menu-item key="sub2">
              <user-outlined />
              <router-link to="/ask">要求上传</router-link>
            </a-menu-item>

            <a-sub-menu key="sub3">
              <template #title>
                <span>
                  <notification-outlined />
                  个人空间
                </span>
              </template>

              <a-menu-item key="9">
                <router-link to="/info">
                  <user-outlined />
                  基本信息
                </router-link>
              </a-menu-item>

              <a-menu-item key="10">
                <router-link to="/editInfo">
                  <FormOutlined />
                  修改信息
                </router-link>
              </a-menu-item>

              <a-menu-item key="11">
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

</style>
