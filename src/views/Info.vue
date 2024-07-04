<script lang="ts" setup>
import { computed } from 'vue';
import { RegionText } from 'v-region';
import { thisFullUserInfo } from '@/utils/UserInfo';
import http from '@/utils/http';

const labelCol = { style: { width: '150px' } };
const wrapperCol = { span: 14 };

const user_id = 222222222222;

http.post('/getFullInfo', { user_id: user_id }).then((res) => {
  thisFullUserInfo.value = res.data;
});

const isRegionReady = computed(() =>
  Object.values(thisFullUserInfo.value.region).some((value) => value !== '')
);
</script>

<template>
  <a-form
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    layout="horizontal"
    style="max-width: 600px">
    <a-form-item label="姓名">
      {{ thisFullUserInfo.name }}
    </a-form-item>
    <a-form-item label="年龄">
      {{ thisFullUserInfo.age }}
    </a-form-item>
    <a-form-item label="性别">
      {{ thisFullUserInfo.gender }}
    </a-form-item>
    <a-form-item label="用户类型">
      {{ thisFullUserInfo.type }}
    </a-form-item>
    <a-form-item label="学工号">
      {{ thisFullUserInfo.user_id }}
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
  </a-form>
</template>
