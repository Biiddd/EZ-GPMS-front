<template>
  <a-table :columns="columns" :data-source="dataSource" :pagination="false"></a-table>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';

const columns = ref([
  {
    title: '组号',
    dataIndex: 'group_id',
    key: 'group_id'
  },
  {
    title: '教师名单',
    dataIndex: 'teachers',
    key: 'teachers'
  },
  {
    title: '学生名单',
    dataIndex: 'students',
    key: 'students'
  }
]);

const dataSource = ref([
  {
    key: '1',
    group_id: '',
    teachers: [],
    students: []
  },
  {
    key: '2',
    group_id: '',
    teachers: [],
    students: []
  },
  {
    key: '3',
    group_id: '',
    teachers: [],
    students: []
  }
]);

export default {
  setup() {
    // Simulating onMounted behavior
    onMounted(() => {
      // Simulated async operation
      // Normally you would fetch data from an API and populate dataSource
    });

    return {
      columns,
      dataSource
    };
  }
};
</script>

<style scoped></style>
