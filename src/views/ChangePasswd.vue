<script setup lang="ts">
import { ref } from "vue";
import { message } from "ant-design-vue";
import axios from "axios";

const labelCol = { style: { width: "150px" } };
const wrapperCol = { span: 14 };

const inputOldPasswd = ref<string>("");
const oldPasswd: string = "1234"; // 测试假设旧密码是 1234
// const oldPasswd = ref<string>("");
const newPasswd = ref<string>("");
const confirmPasswd = ref<string>("");

// 检查旧密码是否输入正确
const wrongOldPasswd = () => {
  if (oldPasswd !== inputOldPasswd.value) {
    message.error("旧密码输入错误");
    console.log("旧密码输入错误");
    console.log("旧密码：", oldPasswd);
    return false;
  } else {
    return true;
  }
};

// 检查两次输入的新密码是否一致
const comparePasswd = () => {
  if (newPasswd.value !== confirmPasswd.value) {
    message.error("两次输入的新密码不一致");
    console.log("两次输入的密码不一致");
    console.log("新密码：", newPasswd.value);
    return false;
  } else {
    return true;
  }
};

// 检查新密码是否与旧密码相同
const oldAndNewPasswd = () => {
  if (oldPasswd === newPasswd.value) {
    message.error("新密码不能与旧密码相同");
    console.log("新密码不能与旧密码相同");
    console.log("新密码：", newPasswd.value);
    return false;
  } else {
    return true;
  }
};

const onConfirm = () => {
  // 如果所有检查通过，发送数据到后端
  if (wrongOldPasswd() && oldAndNewPasswd() && comparePasswd()) {
    axios.post("/api/changePasswd", {
      newPasswd: newPasswd.value,
    });
    message.success("修改密码成功");
    console.log("数据发送到后端：", {
      oldPasswd: oldPasswd,
      newPasswd: newPasswd.value,
    });

    inputOldPasswd.value = "";
    newPasswd.value = "";
    confirmPasswd.value = "";
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
      <a-input-password
        v-model:value="inputOldPasswd"
        placeholder="请输入旧密码"
      />
    </a-form-item>

    <a-form-item label="新密码">
      <a-input-password v-model:value="newPasswd" placeholder="请输入新密码" />
    </a-form-item>

    <a-form-item label="确认新密码">
      <a-input-password
        v-model:value="confirmPasswd"
        placeholder="再次输入新密码"
      />
    </a-form-item>

    <a-form-item>
      <a-button type="primary" @click="onConfirm">确认修改</a-button>
    </a-form-item>
  </a-form>
</template>

<style scoped></style>
