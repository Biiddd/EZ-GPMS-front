<template>
  <div>
    <a-steps v-model:current="current">
      <a-step
          v-for="(item, index) in items"
          :key="index"
          :title="item.title"
          :description="current > index ? '已完成' : item.description"
          :disabled="true"
      ></a-step>
    </a-steps>
      <a-space wrap>
        <a-button @click="nextStep" :disabled="current>=items.length  " class="prev-button" type="primary">完成该步骤</a-button>
        <a-button @click="prevStep" :disabled="current <= 0" class="next-button" type="primary">返回上一步</a-button>
      </a-space>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const current = ref<number>(0);
const description = '等待完成';

const items = ref([
  {
    title: '开题报告',
    description,
  },
  {
    title: '开题答辩',
    description,
  },
  {
    title: '中期成果',
    description,
  },
  {
    title: '上传终稿',
    description,
  },
  {
    title: '答辩申请稿',
    description,
  },
  {
    title: '最终成绩',
    description,
  },
]);

const nextStep = () => {
  if (current.value < items.value.length) {
    current.value++;
  }
};
const prevStep = () => {
  if (current.value > 0) {
    current.value--;
  }
};
</script>
<style scoped>
.custom-button {
  margin-top: 8px;
  padding: 8px 16px;
  background-color: #1890ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.prev-button {
  margin-right: 8px;
}

.next-button {
  margin-left: 1080px;
}

button:disabled {
  background-color: #f5f5f5;
  color: #d9d9d9;
  cursor: not-allowed;
}
</style>


