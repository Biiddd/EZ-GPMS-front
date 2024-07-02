<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons-vue';
const labelCol = { style: { width: '150px' } };
const wrapperCol = { span: 14 };
</script>

<template>
  <a-form
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      layout="horizontal"
      style="max-width: 600px"
  >
    <a-form-item label="Upload">
      <a-upload action="/upload.do">
        <a-button>
          <upload-outlined />
        </a-button>
      </a-upload>
    </a-form-item>
    <a-form-item label="Upload">
      <a-upload action="/upload.do">
        <a-button>
          <upload-outlined />
        </a-button>
      </a-upload>
    </a-form-item>
    <a-form-item label="Button">
      <a-button>提交</a-button>
    </a-form-item>
  </a-form>
</template>


