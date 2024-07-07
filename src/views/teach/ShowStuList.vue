<script lang="ts" setup>
import type { TableColumnsType } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import http from '@/utils/http';
import { ScoreData } from '@/utils/ScoreData';
import { getUserInfo } from '@/utils/auth';

const columns: TableColumnsType = [
  {
    title: '姓名',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left'
  },
  { title: '学号', width: 100, dataIndex: 'stu_id', key: '0', fixed: 'left' },
  { title: '翻译成绩', dataIndex: 'transScore', key: '1', width: 150 },
  { title: '开题成绩', dataIndex: 'startScore', key: '2', width: 150 },
  { title: '中期成绩', dataIndex: 'midScore', key: '3', width: 150 },
  { title: '终稿成绩', dataIndex: 'teachScore', key: '4', width: 150 },
  { title: '评阅成绩', dataIndex: 'readScore', key: '5', width: 150 },
  { title: '答辩成绩', dataIndex: 'defScore', key: '6', width: 150 },
  { title: '总评成绩', dataIndex: 'finalScore', key: '7', width: 150 },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100
  }
];

const dataSource = ref([]);

const scoreData = ref<ScoreData>();

// -1 显示为尚未评分
function formatScore(score: number | string): string | number {
  return score === null ? '尚未评分' : score;
}

// null 或空字符串显示为无评价
function formatEvaluation(eva: string | null | undefined): string {
  return eva === null || eva === undefined || eva === '' ? '暂无评价' : eva;
}

onMounted(async () => {
  try {
    const response = await http.post('/teacher/getStuList', { user_id: getUserInfo().user_id });

    dataSource.value = response.data.map((student: any) => ({
      stu_id: student.stu_id,
      name: student.name,
      transScore: formatScore(student.transScore),
      startScore: formatScore(student.startScore),
      midScore: formatScore(student.midScore),
      teachScore: formatScore(student.teachScore),
      readScore: formatScore(student.readScore),
      defScore: formatScore(student.defScore),
      finalScore: formatScore(student.finalScore)
    }));
  } catch (error) {
    console.error('获取评分数据失败:', error);
  }
});
</script>

<template>
  <a-table :columns="columns" :data-source="dataSource" :pagination="false">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'operation'">
        <router-link :to="`/signScore/${record.stu_id}`">进入打分</router-link>
      </template>
      <template v-else>
        {{ record[column.dataIndex] }}
      </template>
    </template>
  </a-table>
</template>
