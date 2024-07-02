<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { RegionSelects } from "v-region";
import http from "@/http";

const labelCol = { style: { width: "150px" } };
const wrapperCol = { span: 14 };

const user_id = 111111111111; // dev阶段手动设置

interface RegionInputModel {
  province: string;
  city: string;
  area: string;
  town: string;
}

const region = ref<RegionInputModel>({
  province: "",
  city: "",
  area: "",
  town: "",
});

interface UserInfo {
  id: string;
  name: string;
  age: string | number;
  gender: string;
  type: string;
  tel: string;
  email: string;
  detailAdd: string;
}

const thisUserInfo = ref<UserInfo>({
  id: "",
  name: "",
  age: "",
  gender: "",
  type: "",
  tel: "",
  email: "",
  detailAdd: "",
});

const onSubmitClick = async () => {
  try {
    await http.post("/editInfo", {
      user_id: user_id,
      tel: thisUserInfo.value.tel,
      email: thisUserInfo.value.email,
      province: region.value.province,
      city: region.value.city,
      area: region.value.area,
    });
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  http.post("/getInfo", { user_id: user_id }).then((res) => {
    thisUserInfo.value.tel = res.data.tel;
    thisUserInfo.value.email = res.data.email;
    thisUserInfo.value.detailAdd = res.data.detailAdd;
    region.value = {
      province: res.data.province,
      city: res.data.city,
      area: res.data.area,
      town: res.data.town,
    };
  });
});
</script>

<template>
  <a-form
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    layout="horizontal"
    style="max-width: 600px"
  >
    <a-form-item label="联系方式">
      <a-input v-model:value="thisUserInfo.tel" />
    </a-form-item>

    <a-form-item label="邮箱">
      <a-input v-model:value="thisUserInfo.email" />
    </a-form-item>

    <a-form-item label="联系地址">
      <RegionSelects v-model="region" />
    </a-form-item>

    <a-form-item label="详细地址">
      <a-input v-model:value="thisUserInfo.detailAdd" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 6, span: 6 }">
      <a-button type="primary" @click="onSubmitClick">确认编辑</a-button>
    </a-form-item>
  </a-form>
</template>
