<script lang="ts" setup>
import { computed } from 'vue';
import { RegionText } from 'v-region';
import { thisFullUserInfo } from '@/utils/UserInfo';
import http from '@/utils/http';
import { getUserInfo } from '@/utils/auth';

const labelCol = { style: { width: '150px' } };
const wrapperCol = { span: 14 };

http.post('/getFullInfo', { user_id: getUserInfo().user_id }).then((res) => {
  thisFullUserInfo.value = res.data;
});

const isRegionReady = computed(() =>
  Object.values(thisFullUserInfo.value.region).some((value) => value !== '')
);

function defaultAvatar(event) {
  event.target.src = '/path_to_default_avatar.png'; // Fallback avatar
}
</script>

<template>
  <a-form
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    layout="horizontal"
    style="max-width: 900px">

     <!-- Avatar Section -->
    <a-row gutter={16}> <!-- 添加间隙 -->
      <!-- Avatar Column -->
      <a-col span={6}> <!-- 列宽 -->
    <a-form-item>
      <a-space direction="vertical" align="center">
        <a-avatar :size="100" src="path_to_image" @error="defaultAvatar">
          <template #icon></template>
        </a-avatar>
      </a-space>
    </a-form-item>
      </a-col>

      <a-col span={18}> <!-- 列宽 -->
    <a-form-item label="姓名">
      {{ thisFullUserInfo.name }}
    </a-form-item>
    <a-form-item label="年龄">
      {{ thisFullUserInfo.age }}
    </a-form-item>
    <a-form-item label="性别">
      {{ thisFullUserInfo.gender }}
    </a-form-item>
    <a-form-item label="学工号">
      {{ thisFullUserInfo.user_id }}
    </a-form-item>
    <a-form-item label="用户类型">
      {{ thisFullUserInfo.type }}
    </a-form-item>
    <a-form-item label="职称" v-if="thisFullUserInfo.type === '老师'">
      {{ thisFullUserInfo.title }}
    </a-form-item>
    <a-form-item label="当前所在教师组" v-if="thisFullUserInfo.type === '老师'">
      {{ thisFullUserInfo.teacherGroup }}
    </a-form-item>
    <a-form-item label="班级" v-if="thisFullUserInfo.type === '学生'">
      {{ thisFullUserInfo.class }}
    </a-form-item>
    <a-form-item label="专业" v-if="thisFullUserInfo.type === '学生'">
      {{ thisFullUserInfo.major }}
    </a-form-item>
    <a-form-item label="当前所在学生组" v-if="thisFullUserInfo.type === '学生'">
      {{ thisFullUserInfo.stuGroup }}
    </a-form-item>
    <a-form-item label="联系方式">
      {{ thisFullUserInfo.tel }}
    </a-form-item>
    <a-form-item label="邮箱地址">
      {{ thisFullUserInfo.email }}
    </a-form-item>
    <a-form-item label="联系地址" v-if="isRegionReady">
      <RegionText v-model="thisFullUserInfo.region" />
      {{ thisFullUserInfo.detailAdd }}
    </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>
