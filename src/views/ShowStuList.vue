<script lang="ts" setup>
import type { TableColumnsType } from "ant-design-vue";
import {onMounted, ref} from "vue";
import http from "@/http";
import {ScoreData} from "@/utils/ScoreData";

const columns: TableColumnsType = [
  {
    title: "姓名",
    width: 100,
    dataIndex: "name",
    key: "name",
    fixed: "left",
  },
  { title: "学号", width: 100, dataIndex: "stu_id", key: "0", fixed: "left" },
  { title: "翻译成绩", dataIndex: "transScore", key: "1", width: 150 },
  { title: "开题成绩", dataIndex: "startScore", key: "2", width: 150 },
  { title: "中期成绩", dataIndex: "midScore", key: "3", width: 150 },
  { title: "终稿成绩", dataIndex: "teachScore", key: "4", width: 150 },
  { title: "评阅成绩", dataIndex: "readScore", key: "5", width: 150 },
  { title: "答辩成绩", dataIndex: "defScore", key: "6", width: 150 },
  { title: "总评成绩", dataIndex: "finalScore", key: "7", width: 150 },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
  },
];
const user_id = 111111111111; // dev阶段手动设置

const dataSource = ref([]);

const scoreData = ref<ScoreData>();

// -1 显示为尚未评分
function formatScore(score: number | string): string | number {
  return score === null ? "尚未评分" : score;
}

// null 或空字符串显示为无评价
function formatEvaluation(eva: string | null | undefined): string {
  return eva === null || eva === undefined || eva === "" ? "暂无评价" : eva;
}

onMounted(async () => {
  try {
    const response = await http.post("/teacher/getStuList", { user_id: user_id });
    scoreData.value = response.data;
    dataSource.value = [
      {

        stu_id: response.data.score_id,
        name: response.data.name,
        transScore: formatScore(scoreData.value.transScore),
        startScore: formatScore(scoreData.value.startScore),
        midScore: formatScore(scoreData.value.midScore),
        teachScore: formatScore(scoreData.value.teachScore),
        readScore: formatScore(scoreData.value.readScore),
        defScore: formatScore(scoreData.value.defScore),
        finalScore: formatScore(scoreData.value.finalScore),
      },
    ];
  } catch (error) {
    console.error("获取评分数据失败:", error);
  }
});

</script>

<template>
  <a-table :columns="columns" :data-source="dataSource" :scroll="{ x: 1500 }">
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'operation'">
        <router-link to="signScore">
          进入打分
        </router-link>
      </template>
    </template>
  </a-table>
</template>
