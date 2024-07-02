<script lang="ts" setup>
import { computed, ref } from "vue";
import { RegionText } from "v-region";
import http from "@/http";

const labelCol = { style: { width: "150px" } };
const wrapperCol = { span: 14 };

const user_id = 222222222222;

interface RegionInputModel {
  province: string
  city: string
  area: string
  town: string
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

http.post("/getInfo", { user_id: user_id }).then((res) => {
  thisUserInfo.value = {
    id: res.data.user_id,
    name: res.data.name,
    age: res.data.age,
    gender: res.data.gender,
    type: res.data.type,
    tel: res.data.tel,
    email: res.data.email,
    detailAdd: res.data.detailAdd
  }

  region.value = {
    province: res.data.province,
    city: res.data.city,
    area: res.data.area,
    town: res.data.town,
  };
});

const isRegionReady = computed(() =>
  Object.values(region.value).some((value) => value !== ""),
);

</script>

<template>
  <a-form
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    layout="horizontal"
    style="max-width: 600px"
  >
    <a-form-item label="姓名">
      {{ thisUserInfo.name }}
    </a-form-item>
    <a-form-item label="年龄">
      {{ thisUserInfo.age }}
    </a-form-item>
    <a-form-item label="性别">
      {{ thisUserInfo.gender }}
    </a-form-item>
    <a-form-item label="用户类型">
      {{ thisUserInfo.type }}
    </a-form-item>
    <a-form-item label="学工号">
      {{ thisUserInfo.id }}
    </a-form-item>
    <a-form-item label="联系方式">
      {{ thisUserInfo.tel }}
    </a-form-item>
    <a-form-item label="邮箱地址">
      {{ thisUserInfo.email }}
    </a-form-item>
    <a-form-item label="联系地址" v-if="isRegionReady">
      <RegionText v-model="region" />
      {{ thisUserInfo.detailAdd }}
    </a-form-item>
  </a-form>
</template>
