<script lang="ts" setup>
import { ref, reactive } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import type { TreeSelectProps, CascaderProps } from "ant-design-vue";

const componentDisabled = ref(true);
const labelCol = { style: { width: "150px" } };
const wrapperCol = { span: 14 };
const radioValue = ref("apple");
const treeData = reactive<TreeSelectProps["treeData"]>([
  {
    title: "Light",
    value: "light",
    children: [{ title: "Bamboo", value: "bamboo" }],
  },
]);
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
    
    <a-form-item label="密码">
      <a-input-password />
    </a-form-item>

    <a-form-item label="确认密码">
      <a-input-password />
    </a-form-item>

    <a-form-item label="Select">
      <a-select>
        <a-select-option value="demo">Demo</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="TreeSelect">
      <a-tree-select :tree-data="treeData" />
    </a-form-item>
    <a-form-item label="Cascader">
      <a-cascader :options="options" />
    </a-form-item>

    <a-form-item label="Button">
      <a-button>Button</a-button>
    </a-form-item>
  </a-form>
</template>
