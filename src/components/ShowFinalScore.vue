<script lang="ts" setup>
import http from "@/http";
import { ref } from "vue";

const finalScore = ref<string>();
const user_id = 111111111111

http.post("/stu/getScore", {user_id: user_id}).then((res) => {
  finalScore.value = res.data.finalScore;
});
</script>

<template>
  <template v-if="finalScore === '-1'">
    <a-empty />
  </template>
  <template v-if="finalScore !== '-1'">
    <a-result status="success" :title="'最终成绩为：' + finalScore" />
  </template>
</template>

<style scoped></style>
