<script lang="ts" setup>
import { onBeforeUnmount, ref } from 'vue';
import { message } from 'ant-design-vue';
import http from '@/utils/http';
import { thisFullUserInfo } from '@/utils/UserInfo';
import { RegionColumns } from 'v-region';

const labelCol = { style: { width: '120px' } };
const wrapperCol = { span: 18 };

const emailRegex: RegExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
const telRegex: RegExp = /^(13[0-9]|14[5-9]|15[0-3,5-9]|16[6]|17[0-8]|18[0-9]|19[8,9])\d{8}$/;

const confirmText = ref<string>('是否确认新增用户?');
const confirmLoading = ref<boolean>(false);
const isShowConfirmDialog = ref<boolean>(false);

const showConfirmDialog = () => {
  isShowConfirmDialog.value = true;
};

const handleOk = () => {
  confirmText.value = '提交中...';
  confirmLoading.value = true;
  onSubmitClick().finally(() => {
    confirmLoading.value = false;
  });
};

function validFormData(): boolean {
  if (!emailRegex.test(thisFullUserInfo.value.email)) {
    message.error('请输入正确的邮箱地址');
    return false;
  }
  if (!telRegex.test(thisFullUserInfo.value.tel)) {
    message.error('请输入正确的手机号码');
    return false;
  }
  return true;
}

const onSubmitClick = async () => {
  if (validFormData()) {
    try {
      console.log(thisFullUserInfo.value);
      await http.put('/admin/addUser', thisFullUserInfo.value);
      isShowConfirmDialog.value = false;
      message.success('新增成功');
      message.success('即将刷新页面', 2);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      message.error('未知错误, 请重试');
    }
  }
};
onBeforeUnmount(() => {
  thisFullUserInfo.value = null;
});
</script>

<template>
  <div class="main">
    <a-form
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      layout="horizontal"
      style="max-width: 1000px">
      <a-row>
        <!-- 左侧列 -->
        <a-col span="24">
          <a-form-item label="用户类型">
            <a-radio-group button-style="solid" v-model:value="thisFullUserInfo.type">
              <a-radio-button value="学生">学生</a-radio-button>
              <a-radio-button value="老师">老师</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>

        <a-col span="8">
          <a-form-item label="学工号">
            <a-input v-model:value="thisFullUserInfo.user_id" />
          </a-form-item>
          <a-form-item label="姓名">
            <a-input v-model:value="thisFullUserInfo.name" />
          </a-form-item>
          <a-form-item label="性别">
            <a-radio-group button-style="solid" v-model:value="thisFullUserInfo.gender">
              <a-radio-button value="男">男</a-radio-button>
              <a-radio-button value="女">女</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="年龄">
            <a-input v-model:value="thisFullUserInfo.age" />
          </a-form-item>
        </a-col>

        <!-- 右侧列 -->
        <a-col span="8">
          <a-form-item label="联系方式">
            <a-input v-model:value="thisFullUserInfo.tel" />
          </a-form-item>
          <a-form-item label="邮箱">
            <a-input v-model:value="thisFullUserInfo.email" />
          </a-form-item>
          <a-form-item label="联系地址">
            <RegionColumns v-model="thisFullUserInfo.region" />
          </a-form-item>

          <a-form-item label="详细地址">
            <a-input v-model:value="thisFullUserInfo.detailAdd" />
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="专业" v-if="thisFullUserInfo.type === '学生'">
            <a-input v-model:value="thisFullUserInfo.major" />
          </a-form-item>
          <a-form-item label="班级" v-if="thisFullUserInfo.type === '学生'">
            <a-input v-model:value="thisFullUserInfo.class" />
          </a-form-item>
          <a-form-item label="学生组" v-if="thisFullUserInfo.type === '学生'">
            <a-input v-model:value="thisFullUserInfo.stuGroup" />
          </a-form-item>
          <a-form-item label="职称" v-if="thisFullUserInfo.type === '老师'">
            <a-input v-model:value="thisFullUserInfo.title" />
          </a-form-item>
          <a-form-item label="教师组" v-if="thisFullUserInfo.type === '老师'">
            <a-input v-model:value="thisFullUserInfo.teacherGroup" />
          </a-form-item>
          <a-form-item label="教师角色" v-if="thisFullUserInfo.type === '老师'">
            <a-select v-model:value="thisFullUserInfo.teacherType">
              <a-select-option value="组长">组长</a-select-option>
              <a-select-option value="小组秘书兼评阅教师">秘书兼评阅教师</a-select-option>
              <a-select-option value="指导教师">指导教师</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col span="24">
          <div class="button">
            <a-form-item :wrapper-col="{ offset: 4, span: 6 }">
              <a-button type="primary" @click="showConfirmDialog">确认新增用户</a-button>
              <a-modal
                v-model:open="isShowConfirmDialog"
                title="提交确认"
                :confirm-loading="confirmLoading"
                @ok="handleOk">
                <p>{{ confirmText }}</p>
              </a-modal>
            </a-form-item>
          </div>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<style scoped>
.main {
  height: 100%;
}

.button {
  margin-top: 20px;
}
</style>
