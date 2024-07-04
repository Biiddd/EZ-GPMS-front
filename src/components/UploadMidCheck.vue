<script lang="ts" setup>
import { ref } from 'vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

const midWork = ref([]);
const midReport = ref([]);

const labelCol = { style: { width: '150px' } };
const wrapperCol = { span: 14 };

const uploadMidWork = (info: any) => {
  if (info.file.status === 'done') {
    message.success('中期成果上传成功', 5);
  } else if (info.file.status === 'error') {
    message.error('中期成果失败, 请重新上传', 5);
  }
};

const uploadMidReport = (info: any) => {
  if (info.file.status === 'done') {
    message.success('中期报告上传成功', 5);
  } else if (info.file.status === 'error') {
    message.error('中期报告失败, 请重新上传', 5);
  }
};
</script>

<template>
  <a-form
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    layout="horizontal"
    style="max-width: 600px">
    <a-form-item :wrapper-col="{ offset: 14, span: 16 }">
      <a-upload
        v-model:file-list="midWork"
        list-type="picture"
        accept=".pdf"
        @change="uploadMidWork"
        :data="{ stu_id: '111111111111', filename: '中期成果' }"
        action="http://127.0.0.1:5174/api/upload">
        <a-button size="large" v-if="midWork.length < 1">
          <upload-outlined />
          选择中期成果
        </a-button>
      </a-upload>
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 14, span: 16 }">
      <a-upload
        v-model:file-list="midReport"
        list-type="picture"
        accept=".pdf"
        @change="uploadMidReport"
        :data="{ stu_id: '111111111111', filename: '中期报告' }"
        action="http://127.0.0.1:5174/api/upload">
        <a-button size="large" v-if="midReport.length < 1">
          <upload-outlined />
          选择终稿
        </a-button>
      </a-upload>
    </a-form-item>
  </a-form>
</template>
