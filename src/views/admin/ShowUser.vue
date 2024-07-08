<script lang="ts" setup>
import type { TableColumnsType } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import http from '@/utils/http';
import { ScoreData } from '@/utils/ScoreData';
import { getUserInfo } from '@/utils/auth';

const StuColumn: TableColumnsType = [
  {
    title: '姓名',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left'
  },
  { title: '学号', width: 80, dataIndex: 'stu_id', key: '0', fixed: 'left' },
  { title: '性别', dataIndex: '', key: '1', width: 100, align: 'center' },
  { title: '年龄', dataIndex: 'age', key: '2', width: 100, align: 'center' },
  { title: '专业', dataIndex: 'major', key: '3', width: 100, align: 'center' },
  { title: '班级', dataIndex: 'class', key: '4', width: 100, align: 'center' },
  { title: '联系方式', dataIndex: 'tel', key: '5', width: 100, align: 'center' },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 60,
    align: 'center'
  }
];

const dataSource = ref([]);

const scoreData = ref<ScoreData>();


onMounted(async () => {
  try {
    const response = await http.post('/admin/getStu', { user_id: getUserInfo().user_id });

    dataSource.value = response.data.map((student: any) => ({
      stu_id: student.stu_id,
      name: student.name,
      gender: student.gender,
      age: student.age,
      major: student.major,
      class: student.class,
      tel: student.tel
    }));
  } catch (error) {
    console.error('获取评分数据失败:', error);
  }
});
</script>

<template>
  <a-table :columns="StuColumn" :data-source="dataSource" :pagination="false" v-if="showStu">
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
