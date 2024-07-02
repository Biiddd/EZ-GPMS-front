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
import Upload_Final from "./Upload_Final.vue";
import Upload_Defense from "./Upload_Defense.vue";
import WaitingOpeningDefense from "./WaitingOpeningDefense.vue";
import ShowFinalScore from "./ShowFinalScore.vue";

const current = ref<number>(4);

const steps = [
  {
    title: '开题报告',
    content: UploadOpening,
  },
  {
    title: '开题答辩',
    content: WaitingOpeningDefense,
  },
  {
    title: '中期成果',
    content: UploadMidCheck,
  },
  {
    title: '上传终稿',
    content: Upload_Final,
  },
  {
    title: '答辩申请稿',
    content: Upload_Defense,
  },
  {
    title: '最终成绩',
    content: ShowFinalScore,
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



