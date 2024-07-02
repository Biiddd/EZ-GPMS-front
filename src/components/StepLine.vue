<template>
  <div>
    <a-steps :current="current" :items="items"></a-steps>
    <div class="steps-content">
      <component :is="steps[current].content" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import UploadOpening from "./UploadOpening.vue";
import UploadMidCheck from "./UploadMidCheck.vue";

// dev阶段手动更改current的值，来查看不同步骤的内容
// 前后端联调时，current的值由后端返回
const current = ref<number>(2);

const steps = [
  {
    title: '开题报告',
    content: UploadOpening,
  },
  {
    title: '开题答辩',
    // 和12行的UploadOpening一样，这里也是一个组件，修改字符串成组件名即可
    content: '上传开题报告',
  },
  {
    title: '中期成果',
    content: UploadMidCheck,
  },
  {
    title: '上传终稿',
    content: '上传开题报告',
  },
  {
    title: '答辩申请稿',
    content: '上传开题报告',
  },
  {
    title: '最终成绩',
    content: '上传开题报告',
  },
]

const items = steps.map(item => ({ key: item.title, title: item.title }));

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


[data-theme='dark'] .steps-content {
  background-color: #2f2f2f;
  border: 1px dashed #404040;
}
</style>


