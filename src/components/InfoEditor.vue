<script lang="ts" setup>
import { ref, reactive } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import type { TreeSelectProps, CascaderProps } from "ant-design-vue";

const labelCol = { style: { width: "150px" } };
const wrapperCol = { span: 14 };

const options = reactive<CascaderProps["options"]>([
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
      },
    ],
  },
]);
const checked = ref(false);
</script>

<template>
  <a-form
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    layout="horizontal"
    style="max-width: 600px"
  >
    <a-form-item label="联系方式">
      <a-input />
    </a-form-item>

    <a-form-item label="邮箱">
      <a-input />
    </a-form-item>

    <a-form-item>
      <a-button type="primary">确认编辑</a-button>
    </a-form-item>
  </a-form>
</template>
