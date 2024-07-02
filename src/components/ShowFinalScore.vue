<script lang="ts" setup>
import axios from "axios";
import { ref } from "vue";

const finalScore = ref<number>();

console.log("finalScore", finalScore);

axios.get("/api/stu/getScore").then((res) => {
  finalScore.value = res.data.finalScore;
});
</script>

<template>
  <template v-if="finalScore === -1">
    <a-empty />
  </template>
  <template v-if="finalScore !== -1">
    <a-result status="success" :title="'最终成绩为：' + finalScore" />
  </template>
</template>

<style scoped></style>
