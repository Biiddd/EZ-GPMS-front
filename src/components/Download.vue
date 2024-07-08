<script setup lang="ts">
import http from '@/utils/http';

const props = defineProps({
  button_text: String,
  userId: String,
  fileName: String,
  fileType: String
});

let filePath: string = '';
let response: any;

const handleDownload = async () => {
  try {
    console.log('用户ID:', props.userId);
    console.log('文件名:', props.fileName);
    if(props.fileName === '评价手册') {
      console.log('导出评价手册')
      response = await http.get('/exportEva', {
        params: {
          stu_id: props.userId,
        }
      });
    } else if (!props.userId) {
      response = await http.get('/stu/getFilePath', {
        params: {
          file: props.fileName
        }
      });
    } else {
      response = await http.get('/teacher/getFilePath', {
        params: {
          user_id: props.userId,
          file: props.fileName
        }
      });
    }
    console.log('获取文件路径:', response.data);
    filePath = response.data.path;
    console.log('文件路径:', filePath);
    // const serverBaseUrl = 'http://127.0.0.1:3333';
    const serverBaseUrl = 'http://192.168.124.36:3333';
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
