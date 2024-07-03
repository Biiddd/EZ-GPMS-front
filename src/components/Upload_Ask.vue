<template>
  <div>
    <div class="steps-content">
      <a-form
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        layout="horizontal"
        style="max-width: 600px"
      >
        <div class="form-container">
          <a-form-item label="任务书：">
            <a-textarea v-model="thispre.task" :autosize="{ minRows: 6, maxRows: 10 }" />
          </a-form-item>
          <a-form-item label="指导书：">
            <a-textarea v-model="thispre.instruct" :autosize="{ minRows: 6, maxRows: 10 }" />
          </a-form-item>
        </div>
        <a-form-item :wrapper-col="{ offset: 14, span: 14 }">
          <a-button size="large" type="primary" @click="handleSubmit">
            提交
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const labelCol = { span: 6 };
const wrapperCol = { span: 18 };
const thispre = ref({
  task: '',
  instruct: '',
});

const handleSubmit = async () => {
  try {
    const response = await fetch('/api/uploadAsk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        task: thispre.task.value, // Use .value to access the actual value
        instruct: thispre.instruct.value, // Use .value to access the actual value
      }),
    });

    const responseData = await response.json();
    console.log(responseData);

    // 清空输入框
    thispre.task = '';
    thispre.instruct = '';
  } catch (error) {
    console.error('Error submitting data:', error);
  }
};
</script>

<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

[data-theme="dark"] .steps-content {
  background-color: #2f2f2f;
  border: 1px dashed #404040;
}
</style>
