<script lang="ts" setup>
import { ref } from "vue";
import { RegionSelects } from "v-region";
import http from "@/http";

const labelCol = { style: { width: "150px" } };
const wrapperCol = { span: 14 };

const newPhone = ref<number>();
const newEmail = ref<string>("");

const region = ref({
  province: "",
  city: "",
  area: "",
  town: "",
});

const onSubmitClick = async () => {
  console.log(region.value);
  console.log(newPhone.value);
  console.log(newEmail.value);
  try {
    await http.post("/editInfo", {
      newPhone: newPhone.value,
      newEmail: newEmail.value,
      province: region.value.province,
      city: region.value.city,
      area: region.value.area,
    });
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <a-form
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    layout="horizontal"
    style="max-width: 600px"
  >
    <a-form-item label="联系方式">
      <a-input v-model:value="newPhone" />
    </a-form-item>

    <a-form-item label="邮箱">
      <a-input v-model:value="newEmail" />
    </a-form-item>

    <a-form-item label="联系地址">
      <RegionSelects v-model="region" />
    </a-form-item>

    <a-form-item label="详细地址">
      <a-input />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 6, span:  6 }">
      <a-button type="primary" @click="onSubmitClick">确认编辑</a-button>
    </a-form-item>
  </a-form>
</template>
