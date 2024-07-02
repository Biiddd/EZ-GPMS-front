<script lang="ts" setup>
import { ref } from 'vue';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

// First upload
const fileList1 = ref([]);
const formData1 = ref(new FormData());

// Second upload
const fileList2 = ref([]);
const formData2 = ref(new FormData());

const labelCol = { style: { width: '150px' } };
const wrapperCol = { span: 14 };

const handleBeforeUpload1 = (file: File) => {
  if (fileList1.value.length > 0) {
    message.error('只能上传一个文件');
    return false; // Prevent automatic upload
  }

  formData1.value.append('files', file);
  fileList1.value.push({ uid: file.uid, name: file.name, status: 'done', originFileObj: file });
  return false; // Prevent automatic upload
};

const handleBeforeUpload2 = (file: File) => {
  if (fileList2.value.length > 0) {
    message.error('只能上传一个文件');
    return false; // Prevent automatic upload
  }

  formData2.value.append('files', file);
  fileList2.value.push({ uid: file.uid, name: file.name, status: 'done', originFileObj: file });
  return false; // Prevent automatic upload
};

const handleRemove1 = (file) => {
  const index = fileList1.value.findIndex(item => item.uid === file.uid);
  if (index !== -1) {
    fileList1.value.splice(index, 1);
    const newFormData = new FormData();
    fileList1.value.forEach(item => {
      newFormData.append('files', item.originFileObj);
    });
    formData1.value = newFormData;
  }
};

const handleRemove2 = (file) => {
  const index = fileList2.value.findIndex(item => item.uid === file.uid);
  if (index !== -1) {
    fileList2.value.splice(index, 1);
    const newFormData = new FormData();
    fileList2.value.forEach(item => {
      newFormData.append('files', item.originFileObj);
    });
    formData2.value = newFormData;
  }
};

const handleSubmit = async () => {
  if (fileList1.value.length === 0 ) {
    message.error('未上传开题报告，请上传');
    return;
  }
  if(fileList2.value.length === 0){
    message.error('未上传外文翻译，请上传');
    return;
  }

  try {
    // Submit first form data
    const response1 = await fetch('/upload1.do', {
      method: 'POST',
      body: formData1.value,
    });

    if (response1.ok) {
      message.success('开题报告上传成功');
    } else {
      message.error('开题报告上传失败');
    }

    // Submit second form data
    const response2 = await fetch('/upload2.do', {
      method: 'POST',
      body: formData2.value,
    });

    if (response2.ok) {
      message.success('外文翻译上传成功');
    } else {
      message.error('外文翻译上传失败');
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
    <a-form-item label="选择开题报告">
      <a-upload
          :file-list="fileList1"
          :before-upload="handleBeforeUpload1"
          :on-remove="handleRemove1"
      >
        <a-button>
          <upload-outlined />
          上传开题报告
        </a-button>
      </a-upload>
    </a-form-item>
    <a-form-item label="选择外文翻译">
      <a-upload
          :file-list="fileList2"
          :before-upload="handleBeforeUpload2"
          :on-remove="handleRemove2"
      >
        <a-button>
          <upload-outlined />
          上传外文翻译
        </a-button>
      </a-upload>
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 6, span: 14 }">
      <a-button type="primary" @click="handleSubmit">提交</a-button>
    </a-form-item>
  </a-form>
</template>
