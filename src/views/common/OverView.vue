<script setup lang="ts">
import {ref, onMounted, onUnmounted, computed} from 'vue';
import { UserOutlined } from '@ant-design/icons-vue';
import { Avatar, FormItem, Row, Col, Space } from 'ant-design-vue';
import {getUserInfo} from "../../utils/auth";
import http from "@/utils/http";
import {thisFullUserInfo} from "@/utils/UserInfo";

// 当头像加载失败时的处理函数
const defaultAvatar = () => {
  // 你可以在这里设置一个默认头像的路径
  return "default_avatar_path";
};

const currentTime = ref(new Date().toLocaleString());

const updateTime = () => {
  currentTime.value = new Date().toLocaleString();
};
http.post('/getFullInfo', { user_id: getUserInfo().user_id }).then((res) => {
  thisFullUserInfo.value = res.data;
});

const isRegionReady = computed(() =>
  Object.values(thisFullUserInfo.value.region).some((value) => value !== '')
);
let timer;

onMounted(() => {
  timer = setInterval(updateTime, 1000); // 每秒更新时间
});

onUnmounted(() => {
  clearInterval(timer); // 组件销毁时清除定时器
});
</script>

<template>
  <div class="container">
    <div class="navbar">
      <!-- Avatar Section -->
      <a-row gutter="16">
        <a-col span="6">
          <a-form-item>
            <a-space direction="vertical" align="center">
              <a-avatar :size="60" src="path_to_image" @error="defaultAvatar">
                <template #icon><UserOutlined /></template>
              </a-avatar>
            </a-space>
          </a-form-item>
        </a-col>
      </a-row>
      <span style="margin-left: 20px; font-size: 24px; color: black;">{{ thisFullUserInfo.name }}，您好！您的工号是：{{ getUserInfo().user_id }} </span>
    </div>
    <div class="content">
      <h1 style="font-size: 24px; font-weight: bold;">欢迎来到毕业设计管理系统</h1>
      <!-- 显示当前时间 -->
      <p style="font-size: 18px;">当前时间：{{ currentTime }}</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 60vh; /* 使用视口高度使容器填满屏幕 */
}

.navbar {
  background-color: #ccc; /* 深灰色 */
  color: white;
  padding: 5px 20px; /* 上下10px，左右20px的填充 */
  display: flex;
  align-items: center; /* 垂直居中对齐 */
}

.content {
  display: flex;
  flex: 1; /* 占据剩余的空间 */
  align-items: center; /* 垂直居中对齐 */
  justify-content: center; /* 水平居中对齐 */
  flex-direction: column; /* 设置方向为列 */
}

h1, p {
  text-align: center; /* 文本居中 */
}
</style>
