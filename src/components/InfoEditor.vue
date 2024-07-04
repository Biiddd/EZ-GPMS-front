<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { RegionSelects } from 'v-region';
import http from '@/utils/http';
import { EditUserInfo, thisEditUserInfo } from '@/utils/UserInfo';

const labelCol = { style: { width: '150px' } };
const wrapperCol = { span: 14 };

const user_id = '111111111111'; // dev阶段手动设置
ref<EditUserInfo>();
const onSubmitClick = async () => {
  try {
    await http.put('/updateInfo', thisEditUserInfo.value);
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  http.post('/getEditInfo', { user_id: user_id }).then((res) => {
    thisEditUserInfo.value = res.data;
  });
});
</script>

<template>
  <a-form
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    layout="horizontal"
    style="max-width: 600px">
    <a-form-item label="联系方式">
      <a-input v-model:value="thisEditUserInfo.tel" />
    </a-form-item>

    <a-form-item label="邮箱">
      <a-input v-model:value="thisEditUserInfo.email" />
    </a-form-item>

    <a-form-item label="联系地址">
      <RegionSelects v-model="thisEditUserInfo.region" />
    </a-form-item>

    <a-form-item label="详细地址">
      <a-input v-model:value="thisEditUserInfo.detailAdd" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 6, span: 6 }">
      <a-button type="primary" @click="onSubmitClick">确认编辑</a-button>
    </a-form-item>
  </a-form>
</template>
