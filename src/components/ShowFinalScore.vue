<script lang="ts" setup>
import http from "@/http";
import { ref } from "vue";
import { ScoreData } from "@/utils/ScoreData";

const thisScore = ref<ScoreData>();
const user_id = 111111111111;

http.post("/stu/getScore", { user_id: user_id }).then((res) => {
  thisScore.value = res.data;
});
</script>

<template>
  <template v-if="thisScore.finalScore === -1">
    <a-result status="info">
      <template #title>
        总评成绩尚未出炉<br />请在成绩页面查看其他得分详情
      </template>
    </a-result>
  </template>
  <template v-if="thisScore.finalScore !== -1">
    <a-result status="success" :title="'最终成绩为：' + thisScore.finalScore" />
  </template>
</template>

<style scoped></style>
