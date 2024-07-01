<template>
  <a-table :columns="columns" :data-source="dataSource">
  </a-table>
</template>
<script setup>
import { ref } from 'vue';

const columns = ref([
  {
    title: '',
    dataIndex: 'column1',
    key: 'column1',
  },
  {
    title: '得分',
    dataIndex: 'column2',
    key: 'column2',
  },
    {
    title: '评价',
    dataIndex: 'column3',
    key: 'column3',
  },
]);

const dataSource = ref([
  {
    key: '1',
    column1: '开题报告',
  },
  {
    key: '2',
    column1: '外文翻译',
  },
      {
    key: '3',
    column1: '中期检查',
  },
      {
    key: '4',
    column1: '指导老师',
  },
      {
    key: '5',
    column1: '评阅老师',
  },
      {
    key: '6',
    column1: '答辩小组',
  },
      {
    key: '7',
    column1: '委员会总评',
  },
]);
</script>

<style scoped>
/* 在这里可以定义表格的样式 */
</style>
