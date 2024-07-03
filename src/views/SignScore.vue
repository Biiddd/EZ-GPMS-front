<script lang="ts" setup>
import { onMounted, ref } from "vue";

const labelCol = { style: { width: "150px" } };
const wrapperCol = { span: 14 };

import http from "@/http";
import { ScoreData } from "@/utils/ScoreData";

const user_id = 111111111111; // dev阶段手动设置

const current = ref<number>();

const thisScore = ref<ScoreData>();

const steps = [
  {
    title: "外文翻译成绩",
  },
  {
    title: "开题成绩",
  },
  {
    title: "中期成绩",
  },
  {
    title: "导师评价成绩",
  },
  {
    title: "评阅成绩",
  },
  {
    title: "答辩成绩",
  },
  {
    title: "最终成绩",
  },
];

function setState() {
  if (thisScore.value.transScore === -1) {
    current.value = 0;
  }

  if (
    thisScore.value.transScore !== -1  &&
    thisScore.value.startScore === -1
  ) {
    current.value = 1;
  }

  if (
    thisScore.value.startScore !== -1 &&
    thisScore.value.midScore === -1
  ) {
    current.value = 2;
  }

  if (
    thisScore.value.midScore !== -1 &&
    thisScore.value.finalScore === -1
  ) {
    current.value = 3;
  }

  if (
    thisScore.value.finalScore !== -1 &&
    thisScore.value.readScore === -1
  ) {
    current.value = 4;
  }

  if (thisScore.value.readScore !== -1 &&
      thisScore.value.defScore === -1
  ) {
    current.value = 5;
  }

  if (
    thisScore.value.defScore !== -1 &&
    thisScore.value.finalScore === -1
  ) {
    current.value = 6;
  }

  console.log("当前步骤：", current.value);
}

http.post("/stu/getScore", { user_id: user_id }).then((res) => {
  thisScore.value = res.data;
  console.log("成绩：", thisScore.value);

  setState();

});

const items = steps.map((item) => ({ key: item.title, title: item.title }));
</script>

<template>
  <div>
    <a-steps :current="current" :items="items"></a-steps>
  </div>
  <div class="steps-content">
    <a-form
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      layout="horizontal"
      style="max-width: 600px"
    >
      <div v-if="current === 0" class="form-container">
        <a-form-item label="翻译阅读理解成绩" >
          <a-input v-model="thisScore.transScore1" />
        </a-form-item>
        <a-form-item label="翻译准确性成绩" >
          <a-input v-model="thisScore.transScore2" />
        </a-form-item>
        <a-form-item label="规范性与质量成绩" >
          <a-input v-model="thisScore.transScore3" />
        </a-form-item>
      </div>

      <!--      开题打分表单      -->
      <div v-if="current === 1">
        <a-form-item label="调研资料获取能力">
          <a-input v-model="thisScore.startScore" />
        </a-form-item>
        <a-form-item label="方案设计合理性">
          <a-input v-model="thisScore.startScore" />
        </a-form-item>
        <a-form-item label="规范性与质量">
          <a-input v-model="thisScore.startScore" />
        </a-form-item>
      </div>

      <!--      中期打分表单      -->
      <div v-if="current === 2">
        <a-form-item label="毕设进度情况">
          <a-input v-model="thisScore.midScore" />
        </a-form-item>
        <a-form-item label="综合能力">
          <a-input v-model="thisScore.midScore" />
        </a-form-item>
        <a-form-item label="已完成毕设质量">
          <a-input v-model="thisScore.midScore" />
        </a-form-item>
        <a-form-item label="中期评语">
          <a-textarea v-model="thisScore.midEva" />
        </a-form-item>
      </div>

      <!--      终稿打分表单      -->
      <div v-if="current === 3">
        <a-form-item label="设计能力">
          <a-input v-model="thisScore.finalScore" />
        </a-form-item>
        <a-form-item label="理论应用能力">
          <a-input v-model="thisScore.finalScore" />
        </a-form-item>
        <a-form-item label="知识综合运用能力">
          <a-input v-model="thisScore.finalScore" />
        </a-form-item>
        <a-form-item label="素养、态度、纪律表现">
          <a-input v-model="thisScore.finalScore" />
        </a-form-item>
        <a-form-item label="毕设规范性与质量">
          <a-input v-model="thisScore.finalEva" />
        </a-form-item>
      </div>

      <!--      评阅打分表单      -->
      <div v-if="current === 4">
        <a-form-item label="评阅成绩">
          <a-input v-model="thisScore.readScore" />
        </a-form-item>
        <a-form-item label="评阅老师评语">
          <a-input v-model="thisScore.readEva" />
        </a-form-item>
      </div>

      <!--      答辩打分表单      -->
      <div v-if="current === 5">
        <a-form-item label="答辩成绩">
          <a-input v-model="thisScore.defScore" />
        </a-form-item>
        <a-form-item label="答辩评语">
          <a-input v-model="thisScore.defEva" />
        </a-form-item>
      </div>

      <!--      最终评价表单      -->
      <div v-if="current === 6">
        <a-form-item label="最终成绩">
          <a-input v-model="thisScore.finalScore" />
        </a-form-item>
        <a-form-item label="最终评价">
          <a-input v-model="thisScore.finalEva" />
        </a-form-item>
      </div>
      <a-form-item>
        <a-button type="primary" html-type="submit">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

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


