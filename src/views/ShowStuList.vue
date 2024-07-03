<script lang="ts" setup>
import type { TableColumnsType } from "ant-design-vue";
const columns: TableColumnsType = [
  {
    title: "姓名",
    width: 100,
    dataIndex: "name",
    key: "name",
    fixed: "left",
  },
  { title: "学号", width: 100, dataIndex: "stu_id", key: "stu_id", fixed: "left" },
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

interface DataItem {
  stu_id: number;
  name: string;
  transScore: string | null;
  startScore: string | null;
  midScore: string | null;
  teachScore: string | null;
  readScore: string | null;
  defScore: string | null;
  finalScore: string | null;
}

const data: DataItem[] = [];

</script>

<template>
  <a-table :columns="columns" :data-source="data" :scroll="{ x: 1500 }">
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'operation'">
        <a>进入打分</a>
      </template>
    </template>
  </a-table>
</template>
