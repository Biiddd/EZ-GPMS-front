<script setup lang="ts">
import http from '@/utils/http';

const props = defineProps({
  button_text: String,
  userId: String,
  fileName: String,
  fileType: String
});

const handleDownload = async () => {
  try {
    console.log('用户ID:', props.userId);
    console.log('文件名:', props.fileName);
    const response = await http.get('/getFilePath', {
      params: {
        user_id: props.userId,
        file: props.fileName
      }
    });

    const filePath = response.data.path;
    console.log('文件路径:', filePath);
    const serverBaseUrl = 'http://127.0.0.1:3333';
    const fullFilePath = `${serverBaseUrl}/${filePath}`;
    console.log('完整文件路径:', fullFilePath);
    const link = document.createElement('a');
    link.href = fullFilePath;
    link.setAttribute('download', `${props.fileName}.${props.fileType}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('下载文件失败:', error);
  }
};
</script>

<template>
  <div>
    <a-button type="primary" size="large" @click="handleDownload">{{ props.button_text }}</a-button>
  </div>
</template>
