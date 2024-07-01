<script setup lang="ts">
import { ref } from "vue";

const labelCol = { style: { width: "150px" } };
const wrapperCol = { span: 14 };

const oldPasswd = ref<string>("");
const newPasswd = ref<string>("");
const confirmPasswd = ref<string>("");

const wrongOldPasswd = () => {
  console.log("旧密码错误");
};

const comparePasswd = () => {
  if (newPasswd.value !== confirmPasswd.value) {
    console.log("两次输入的密码不一致");
  }
};
</script>

<template>
  <a-form
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      layout="horizontal"
      style="max-width: 600px"
  >
    <a-form-item label="旧密码">
      <a-input-password placeholder="请输入旧密码"/>
    </a-form-item>

    <a-form-item label="新密码">
      <a-input-password placeholder="请输入新密码"/>
    </a-form-item>

    <a-form-item label="确认新密码">
      <a-input-password placeholder="再次输入旧密码"/>
    </a-form-item>

    <a-form-item>
      <a-button type="primary">确认修改</a-button>
    </a-form-item>
  </a-form>
</template>

<style scoped></style>
