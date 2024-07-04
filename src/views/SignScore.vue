<script lang="ts" setup>
import { ref } from 'vue';

const labelCol = { style: { width: '300px' } };
const wrapperCol = { span: 14 };

import http from '@/http';
import { thisScore } from '@/utils/ScoreData';
import { message } from 'ant-design-vue';

const user_id = 111111111111; // dev阶段手动设置

const current = ref<number>();

const steps = [
  {
    title: '外文翻译成绩'
  },
  {
    title: '开题成绩'
  },
  {
    title: '中期成绩'
  },
  {
    title: '导师评价成绩'
  },
  {
    title: '评阅成绩'
  },
  {
    title: '答辩成绩'
  },
  {
    title: '最终成绩'
  }
];

function setState() {
  if (thisScore.value.transScore === null) {
    current.value = 0;
  }

  if (thisScore.value.transScore !== null && thisScore.value.startScore === null) {
    current.value = 1;
  }

  if (thisScore.value.startScore !== null && thisScore.value.midScore === null) {
    current.value = 2;
  }

  if (thisScore.value.midScore !== null && thisScore.value.teachScore === null) {
    current.value = 3;
  }

  if (thisScore.value.teachScore !== null && thisScore.value.readScore === null) {
    current.value = 4;
  }

  if (thisScore.value.readScore !== null && thisScore.value.defScore === null) {
    current.value = 5;
  }

  if (thisScore.value.defScore !== null && thisScore.value.finalEva === null) {
    current.value = 6;
  }

  if (thisScore.value.defScore !== null && thisScore.value.finalEva !== null) {
    current.value = 6;
  }
}

http.post('/stu/getScore', { user_id: user_id }).then((res) => {
  thisScore.value = res.data;
  console.log('成绩：', thisScore.value);
  setState();
});

const items = steps.map((item) => ({ key: item.title, title: item.title }));

const tempFinalEva = ref<string | null>(null);

const confirmText = ref<string>('成绩提交后无法修改, 是否确认提交?');
const confirmLoading = ref<boolean>(false);
const isShowConfirmDialog = ref<boolean>(false);
const showConfirmDialog = () => {
  isShowConfirmDialog.value = true;
};

const validSubmit = () => {
  switch (current.value) {
    case 0:
      return (
        thisScore.value.transScore1 != null &&
        thisScore.value.transScore2 != null &&
        thisScore.value.transScore3 != null
      );
    case 1:
      return (
        thisScore.value.startScore1 != null &&
        thisScore.value.startScore2 != null &&
        thisScore.value.startScore3 != null
      );
    case 2:
      return (
        thisScore.value.midScore1 != null &&
        thisScore.value.midScore2 != null &&
        thisScore.value.midScore3 != null
      );
    case 3:
      return (
        thisScore.value.teachScore1 != null &&
        thisScore.value.teachScore2 != null &&
        thisScore.value.teachScore3 != null &&
        thisScore.value.teachScore4 != null &&
        thisScore.value.teachScore5 != null
      );
    case 4:
      return (
        thisScore.value.readScore1 != null &&
        thisScore.value.readScore2 != null &&
        thisScore.value.readScore3 != null &&
        thisScore.value.readScore4 != null
      );
    case 5:
      return (
        thisScore.value.defScore1 != null &&
        thisScore.value.defScore2 != null &&
        thisScore.value.defScore3 != null &&
        thisScore.value.defScore4 != null
      );
    case 6:
      return tempFinalEva.value != null;
    default:
      return false;
  }
};

const handleOk = () => {
  confirmText.value = '提交中...';
  confirmLoading.value = true;
  onSubmit().finally(() => {
    confirmLoading.value = false;
  });
};

const onSubmit = async () => {
  if (validSubmit()) {
    try {
      thisScore.value.finalEva = tempFinalEva.value;
      console.log('提交的成绩：', thisScore.value);
      const response = await http.put('/teacher/updateScore', {
        ...thisScore.value
      });
      console.log('提交成绩成功：', response);
      isShowConfirmDialog.value = false;
      message.success('提交成绩成功');
    } catch (error) {
      console.error('提交成绩失败：', error);
    }
  } else {
    message.error('请填写完整的成绩');
  }
};
</script>

<template>
  <div>
    <a-steps :current="current" :items="items"></a-steps>
  </div>
  <div class="steps-content" v-if="thisScore.finalEva === null">
    <a-form
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      layout="horizontal"
      style="max-width: 600px">
      <div v-if="current === 0" class="form-container">
        <a-form-item label="翻译阅读理解成绩" :wrapper-col="{ offset: -6, span: 6 }">
          <a-input-number
            size="large"
            min="0"
            max="1"
            :controls="false"
            v-model:value="thisScore.transScore1" />
        </a-form-item>
        <a-form-item label="翻译准确性成绩" :wrapper-col="{ offset: -6, span: 6 }">
          <a-input-number
            size="large"
            min="0"
            max="1"
            :controls="false"
            v-model:value="thisScore.transScore2" />
        </a-form-item>
        <a-form-item label="规范性与质量成绩" :wrapper-col="{ offset: -6, span: 6 }">
          <a-input-number
            size="large"
            min="0"
            max="1"
            :controls="false"
            v-model:value="thisScore.transScore3" />
        </a-form-item>
      </div>

      <!--      开题打分表单      -->
      <div v-if="current === 1">
        <a-form-item label="调研资料获取能力" :wrapper-col="{ offset: -6, span: 6 }">
          <a-input-number
            size="large"
            min="0"
            max="4"
            :controls="false"
            v-model:value="thisScore.startScore1" />
        </a-form-item>
        <a-form-item label="方案设计合理性" :wrapper-col="{ offset: -6, span: 6 }">
          <a-input-number
            size="large"
            min="0"
            max="4"
            :controls="false"
            v-model:value="thisScore.startScore2" />
        </a-form-item>
        <a-form-item label="规范性与质量" :wrapper-col="{ offset: -6, span: 6 }">
          <a-input-number
            size="large"
            min="0"
            max="4"
            :controls="false"
            v-model:value="thisScore.startScore3" />
        </a-form-item>
      </div>

      <!--      中期打分表单      -->
      <div v-if="current === 2">
        <a-form-item label="毕设进度情况" :wrapper-col="{ offset: -6, span: 6 }">
          <a-input-number
            size="large"
            min="0"
            max="5"
            :controls="false"
            v-model:value="thisScore.midScore1" />
        </a-form-item>
        <a-form-item label="综合能力" :wrapper-col="{ offset: -6, span: 6 }">
          <a-input-number
            size="large"
            min="0"
            max="5"
            :controls="false"
            v-model:value="thisScore.midScore2" />
        </a-form-item>
        <a-form-item label="已完成毕设质量" :wrapper-col="{ offset: -6, span: 6 }">
          <a-input-number
            size="large"
            min="0"
            max="5"
            :controls="false"
            v-model:value="thisScore.midScore3" />
        </a-form-item>
        <a-form-item label="中期评语" :wrapper-col="{ offset: -6, span: 6 }">
          <a-textarea v-model:value="thisScore.midEva" />
        </a-form-item>
      </div>

      <!--      指导老师评语建议打分表单      -->
      <div v-if="current === 3">
        <a-form-item label="设计能力" :wrapper-col="{ offset: -6, span: 6 }">
          <a-input-number
            size="large"
            min="0"
            max="3"
            :controls="false"
            v-model:value="thisScore.teachScore1" />
        </a-form-item>
        <a-form-item label="理论应用能力" :wrapper-col="{ offset: -6, span: 6 }">
          <a-input-number
            size="large"
            min="0"
            max="3"
            :controls="false"
            v-model:value="thisScore.teachScore2" />
        </a-form-item>
        <a-form-item label="知识综合运用能力" :wrapper-col="{ offset: -6, span: 6 }">
          <a-input-number
            size="large"
            min="0"
            max="3"
            :controls="false"
            v-model:value="thisScore.teachScore3" />
        </a-form-item>
        <a-form-item label="素养、态度、纪律表现" :wrapper-col="{ offset: -6, span: 6 }">
          <a-input-number
            size="large"
            min="0"
            max="3"
            :controls="false"
            v-model:value="thisScore.teachScore4" />
        </a-form-item>
        <a-form-item label="毕设规范性与质量" :wrapper-col="{ offset: -6, span: 6 }">
          <a-input-number
            size="large"
            min="0"
            max="3"
            :controls="false"
            v-model:value="thisScore.teachScore5" />
        </a-form-item>
        <a-form-item label="中期评语" :wrapper-col="{ offset: -6, span: 6 }">
          <a-textarea v-model:value="thisScore.teachEva" />
        </a-form-item>
      </div>

      <!--      评阅打分表单      -->
      <div v-if="current === 4">
        <a-form-item label="毕设规范性与质量" :wrapper-col="{ offset: -6, span: 6 }">
          <a-input-number
            size="large"
            min="0"
            max="4"
            :controls="false"
            v-model:value="thisScore.readScore1" />
        </a-form-item>
        <a-form-item label="理论知识运用情况" :wrapper-col="{ offset: -6, span: 6 }">
          <a-input-number
            size="large"
            min="0"
            max="4"
            :controls="false"
            v-model:value="thisScore.readScore2" />
        </a-form-item>
        <a-form-item label="研究设计方案" :wrapper-col="{ offset: -6, span: 6 }">
          <a-input-number
            size="large"
            min="0"
            max="4"
            :controls="false"
            v-model:value="thisScore.readScore3" />
        </a-form-item>
        <a-form-item label="毕设创新型" :wrapper-col="{ offset: -6, span: 6 }">
          <a-input-number
            size="large"
            min="0"
            max="3"
            :controls="false"
            v-model:value="thisScore.readScore4" />
        </a-form-item>
        <a-form-item label="评阅老师评语" :wrapper-col="{ offset: -6, span: 6 }">
          <a-textarea v-model:value="thisScore.readEva" />
        </a-form-item>
      </div>

      <!--      答辩打分表单      -->
      <div v-if="current === 5">
        <a-form-item label="毕设陈述情况" :wrapper-col="{ offset: -6, span: 6 }">
          <a-input-number
            size="large"
            min="0"
            max="10"
            :controls="false"
            v-model:value="thisScore.defScore1" />
        </a-form-item>
        <a-form-item label="毕设（论文）水平" :wrapper-col="{ offset: -6, span: 6 }">
          <a-input-number
            size="large"
            min="0"
            max="10"
            :controls="false"
            v-model:value="thisScore.defScore2" />
        </a-form-item>
        <a-form-item label="毕设工作量评价" :wrapper-col="{ offset: -6, span: 6 }">
          <a-textarea v-model:value="thisScore.defScore3" />
        </a-form-item>

        <a-form-item label="答辩情况" :wrapper-col="{ offset: -6, span: 6 }">
          <a-input-number
            size="large"
            min="0"
            max="10"
            :controls="false"
            v-model:value="thisScore.defScore4" />
        </a-form-item>
        <a-form-item label="答辩小组评语" :wrapper-col="{ offset: -6, span: 6 }">
          <a-textarea v-model:value="thisScore.defEva" />
        </a-form-item>
      </div>

      <!--      最终评价表单      -->
      <div v-if="current === 6">
        <a-form-item label="最终评价" :wrapper-col="{ offset: -6, span: 6 }">
          <a-textarea v-model:value="tempFinalEva" />
        </a-form-item>
      </div>
      <a-form-item :wrapper-col="{ offset: 13, span: 4 }">
        <a-button size="middle" type="primary" @click="showConfirmDialog">提交成绩</a-button>
        <a-modal
          v-model:open="isShowConfirmDialog"
          title="提交确认"
          :confirm-loading="confirmLoading"
          @ok="handleOk">
          <p>{{ confirmText }}</p>
        </a-modal>
      </a-form-item>
    </a-form>
  </div>

  <div v-if="thisScore.finalEva !== null" class="steps-content">
    <a-result status="success" title="该学生评分工作已完成"> </a-result>
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

[data-theme='dark'] .steps-content {
  background-color: #2f2f2f;
  border: 1px dashed #404040;
}
</style>
