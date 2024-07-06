<script lang="ts" setup>
import http from '@/utils/http';
import { thisScore } from '@/utils/ScoreData';
import { getUserInfo } from '@/utils/auth';

http.post('/stu/getScore', { user_id: getUserInfo().user_id }).then((res) => {
  thisScore.value = res.data;
});
</script>

<template>
  <template v-if="thisScore.finalScore === null">
    <a-result status="info">
      <template #title> 总评成绩尚未出炉<br />请在成绩页面查看其他得分详情</template>
    </a-result>
  </template>
  <template v-else>
    <a-result status="success" :title="'最终成绩为：' + thisScore.finalScore" />
  </template>
</template>

<style scoped></style>
