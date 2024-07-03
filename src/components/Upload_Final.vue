<script lang="ts" setup>
import { ref } from 'vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import http from '@/http';

const fileList = ref([]);
const formData = ref(new FormData());

const labelCol = { style: { width: '150px' } };
const wrapperCol = { span: 14 };

const handleBeforeUpload = (file: any) => {
  formData.value.append('files', file);
  fileList.value.push({
    uid: file.uid,
    name: file.name,
    status: 'done',
    originFileObj: file
  });
  return false;
};

const handleRemove = (file: any) => {
  const index = fileList.value.findIndex((item) => item.uid === file.uid);
  if (index !== -1) {
    fileList.value.splice(index, 1);

    const newFormData = new FormData();
    fileList.value.forEach((item) => {
      newFormData.append('files', item.originFileObj);
    });
    formData.value = newFormData;
  }
};

const handleSubmit = async () => {
  if (fileList.value.length === 0) {
    message.error('未上传终稿，请上传');
    return;
  }
  try {
    const response = await http.post('/stu/upload/final', formData.value, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (response.status === 200) {
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
    style="max-width: 600px">
    <a-form-item :wrapper-col="{ offset: 14, span: 14 }">
      <a-upload
        :file-list="fileList"
        list-type="picture"
        accept=".pdf"
        :before-upload="handleBeforeUpload"
        :on-remove="handleRemove">
        <a-button size="large" v-if="fileList.length < 1">
          <upload-outlined />
          选择终稿
        </a-button>
      </a-upload>
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 14, span: 14 }">
      <a-button size="large" type="primary" @click="handleSubmit">提交 </a-button>
    </a-form-item>
  </a-form>
</template>
