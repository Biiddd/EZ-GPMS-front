<template>
  <a-table :columns="columns" :data-source="dataSource" :pagination="false">
  </a-table>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import http from "@/http";

const user_id = 111111111111; // dev阶段手动设置

const columns = ref([
  {
    title: "",
    dataIndex: "column1",
    key: "column1",
  },
  {
    title: "得分",
    dataIndex: "score",
    key: "score",
  },
  {
    title: "评价",
    dataIndex: "evaluation",
    key: "evaluation",
  },
]);

const dataSource = ref([]);

interface ScoreData {
  // 开题报告
  startScore1: string;
  startScore2: string;
  startScore3: string;
  startScore: string;
  startEva: string | null;

  // 外文翻译
  transScore1: string;
  transScore2: string;
  transScore3: string;
  transScore: string;
  transEva: string | null;

  // 中期检查
  midScore1: string;
  midScore2: string;
  midScore3: string;
  midScore: string;
  midEva: string | null;

  // 指导老师
  teachScore1: string;
  teachScore2: string;
  teachScore3: string;
  teachScore4: string;
  teachScore5: string;
  teachScore: string;
  teachEva: string | null;

  // 评阅老师
  readScore1: string;
  readScore2: string;
  readScore3: string;
  readScore4: string;
  readScore: string;
  readEva: string | null;

  // 答辩小组
  defScore1: string;
  defScore2: string;
  defScore3: string;
  defScore4: string;
  defScore: string;
  defEva: string | null;

  // 委员会总评
  finalScore: string;
  finalEva: string | null;
}

const scoreData = ref<ScoreData>({
  // 开题报告
  startScore1: "",
  startScore2: "",
  startScore3: "",
  startScore: "",
  startEva: "",

  // 外文翻译
  transScore1: "",
  transScore2: "",
  transScore3: "",
  transScore: "",
  transEva: "",

  // 中期检查
  midScore1: "",
  midScore2: "",
  midScore3: "",
  midScore: "",
  midEva: "",

  // 指导老师
  teachScore1: "",
  teachScore2: "",
  teachScore3: "",
  teachScore4: "",
  teachScore5: "",
  teachScore: "",
  teachEva: "",

  // 评阅老师
  readScore1: "",
  readScore2: "",
  readScore3: "",
  readScore4: "",
  readScore: "",
  readEva: "",

  // 答辩小组
  defScore1: "",
  defScore2: "",
  defScore3: "",
  defScore4: "",
  defScore: "",
  defEva: "",

  // 委员会总评
  finalScore: "",
  finalEva: "",
});

onMounted(async () => {
  try {
    const response = await http.post("/stu/getScore", { user_id: user_id });
    const scoreData = response.data;

    dataSource.value = [
      {
        key: "1",
        column1: "开题报告",
        score: formatScore(scoreData.startScore),
        evaluation: formatEvaluation(scoreData.startEva),
      },
      {
        key: "2",
        column1: "外文翻译",
        score: formatScore(scoreData.transScore),
        evaluation: formatEvaluation(scoreData.transEva),
      },
      {
        key: "3",
        column1: "中期检查",
        score: formatScore(scoreData.midScore),
        evaluation: formatEvaluation(scoreData.midEva),
      },
      {
        key: "4",
        column1: "指导老师",
        score: formatScore(scoreData.teachScore),
        evaluation: formatEvaluation(scoreData.teachEva),
      },
      {
        key: "5",
        column1: "评阅老师",
        score: formatScore(scoreData.readScore),
        evaluation: formatEvaluation(scoreData.readEva),
      },
      {
        key: "6",
        column1: "答辩小组",
        score: formatScore(scoreData.defScore),
        evaluation: formatEvaluation(scoreData.defEva),
      },
      {
        key: "7",
        column1: "委员会总评",
        score: formatScore(scoreData.finalScore),
        evaluation: formatEvaluation(scoreData.finalEva),
      },
    ];
  } catch (error) {
    console.error("获取评分数据失败:", error);
  }
});

// -1 显示为尚未评分
function formatScore(score: string): string {
  return score === "-1" ? "尚未评分" : score;
}

// null 或空字符串显示为无评价
function formatEvaluation(eva: string | null | undefined): string {
  return eva === null || eva === undefined || eva === "" ? "无评价" : eva;
}
</script>

<style scoped>
/* 在这里可以定义表格的样式 */
</style>
