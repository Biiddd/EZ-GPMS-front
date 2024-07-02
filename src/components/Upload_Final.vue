<script lang="ts" setup>
import { ref } from 'vue';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

const fileList = ref([]);
const formData = ref(new FormData());

const labelCol = { style: { width: '150px' } };
const wrapperCol = { span: 14 };

const handleBeforeUpload = (file: File) => {
  // Check if a file is already uploaded
  if (fileList.value.length > 0) {
    message.error('只能上传一个文件');
    return false; // Prevent automatic upload
  }

  // Store file in formData for later submission
  formData.value.append('files', file);
  fileList.value.push({ uid: file.uid, name: file.name, status: 'done', originFileObj: file });
  return false; // Prevent automatic upload
};

const handleRemove = (file) => {
  // Remove file from formData
  const index = fileList.value.findIndex(item => item.uid === file.uid);
  if (index !== -1) {
    fileList.value.splice(index, 1);
    // Also remove the file from formData
    const newFormData = new FormData();
    fileList.value.forEach(item => {
      newFormData.append('files', item.originFileObj);
    });
    formData.value = newFormData;
  }
};

const handleSubmit = async () => {
  // Simulate submitting the form data
  if (fileList.value.length === 0) {
    message.error('未上传终稿，请上传');
    return;
  }
  try {
    const response = await fetch('/upload.do', {
      method: 'POST',
      body: formData.value,
    });

    if (response.ok) {
      message.success('终稿上传成功');
    } else {
      message.error('终稿上传失败');
    }
  } catch (error) {
    message.error('上传过程中发生错误');
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
    <a-form-item label="选择终稿">
      <a-upload
          :file-list="fileList"
          :before-upload="handleBeforeUpload"
          :on-remove="handleRemove"
      >
        <a-button>
          <upload-outlined />
          上传终稿
        </a-button>
      </a-upload>
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 6, span: 14 }">
      <a-button type="primary" @click="handleSubmit">提交</a-button>
    </a-form-item>
  </a-form>
</template>
