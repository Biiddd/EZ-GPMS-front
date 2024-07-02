<script lang="ts" setup>
import { ref } from "vue";
import { RegionText } from 'v-region'

const region = ref({
  province: '350000',
  city: '350100',
  area: '350104',
  town: ''
})

const labelCol = { style: { width: "150px" } };
const wrapperCol = { span: 14 };

const name = ref("张三");
const age = ref(18);
const gender = ref("男");
const type = ref("学生");
const id = ref("123456789012345678");
const phone = ref("12345678901");
const email = ref("12@qq.com");
const detailAddress = ref("长安街1号");
</script>

<template>
  <a-form
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    layout="horizontal"
    style="max-width: 600px"
  >
    <a-form-item label="姓名">
      {{ name }}
    </a-form-item>
    <a-form-item label="年龄">
      {{ age }}
    </a-form-item>
    <a-form-item label="性别">
      {{ gender }}
    </a-form-item>
    <a-form-item label="用户类型">
      {{ type }}
    </a-form-item>
    <a-form-item label="学工号">
      {{ id }}
    </a-form-item>
    <a-form-item label="联系方式">
      {{ phone }}
    </a-form-item>
    <a-form-item label="邮箱地址">
      {{ email }}
    </a-form-item>
    <a-form-item label="联系地址">
      <RegionText v-model="region" />
      {{detailAddress}}
    </a-form-item>
  </a-form>
</template>
