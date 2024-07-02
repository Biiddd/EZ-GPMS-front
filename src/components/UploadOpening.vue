<script lang="ts" setup>
import { ref } from "vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import axios from "axios";

const outSchool = ref<boolean>(false);

const fileList0 = ref([]);
const formData0 = ref(new FormData());

const fileList1 = ref([]);
const formData1 = ref(new FormData());

const fileList2 = ref([]);
const formData2 = ref(new FormData());

const labelCol = { style: { width: "150px" } };
const wrapperCol = { span: 14 };

const handleBeforeUpload0 = (file: any) => {
  formData0.value.append("files", file);
  fileList0.value.push({
    uid: file.uid,
    name: file.name,
    status: "done",
    originFileObj: file,
  });
  return false;
};

const handleBeforeUpload1 = (file: any) => {
  formData1.value.append("files", file);
  fileList1.value.push({
    uid: file.uid,
    name: file.name,
    status: "done",
    originFileObj: file,
  });
  return false;
};

const handleBeforeUpload2 = (file: any) => {
  formData2.value.append("files", file);
  fileList2.value.push({
    uid: file.uid,
    name: file.name,
    status: "done",
    originFileObj: file,
  });
  return false;
};

const handleRemove0 = (file: any) => {
  const index = fileList0.value.findIndex((item) => item.uid === file.uid);
  if (index !== -1) {
    fileList0.value.splice(index, 1);
    const newFormData = new FormData();
    fileList0.value.forEach((item) => {
      newFormData.append("files", item.originFileObj);
    });
    formData0.value = newFormData;
  }
};

const handleRemove1 = (file: any) => {
  const index = fileList1.value.findIndex((item) => item.uid === file.uid);
  if (index !== -1) {
    fileList1.value.splice(index, 1);
    const newFormData = new FormData();
    fileList1.value.forEach((item) => {
      newFormData.append("files", item.originFileObj);
    });
    formData1.value = newFormData;
  }
};

const handleRemove2 = (file: any) => {
  const index = fileList2.value.findIndex((item) => item.uid === file.uid);
  if (index !== -1) {
    fileList2.value.splice(index, 1);
    const newFormData = new FormData();
    fileList2.value.forEach((item) => {
      newFormData.append("files", item.originFileObj);
    });
    formData2.value = newFormData;
  }
};

const handleSubmit = async () => {
  if(outSchool && fileList0.value.length === 0){
    message.error('未上传校外毕设申请，请上传');
    return;
  }
  if (fileList1.value.length === 0) {
    message.error("未上传开题报告，请上传");
    return;
  }
  if (fileList2.value.length === 0) {
    message.error("未上传外文翻译，请上传");
    return;
  }

  try {
    // 上传校外毕设申请
    if (outSchool) {
      const response0 = await axios.post(
        "/api/stu/upload/outSchool",
        formData0.value,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response0.status === 200) {
        message.success("校外毕设申请上传成功");
      } else {
        message.error("校外毕设申请上传失败");
      }
    }

    // 上传开题报告
    const response1 = await axios.post(
      "/api/stu/upload/start",
      formData1.value,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    if (response1.status === 200) {
      message.success("开题报告上传成功");
    } else {
      message.error("开题报告上传失败");
    }

    // 上传外文翻译
    const response2 = await axios.post(
      "/api/stu/upload/translation",
      formData2.value,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    if (response2.status === 200) {
      message.success("外文翻译上传成功");
    } else {
      message.error("外文翻译上传失败");
    }
  } catch (error) {
    message.error("上传过程中发生错误");
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
    <a-form-item :wrapper-col="{ offset: 14, span: 24 }">
      <a-checkbox v-model:checked="outSchool" style="font-weight: bold"
        >是否在校外进行毕设</a-checkbox
      >
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 14, span: 24 }" v-if="outSchool">
      <a-upload
        :file-list="fileList0"
        list-type="picture"
        accept=".pdf"
        :before-upload="handleBeforeUpload0"
        :on-remove="handleRemove0"
      >
        <a-button size="large" v-if="fileList0.length < 1">
          <upload-outlined />
          选择校外毕设申请
        </a-button>
      </a-upload>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 14, span: 24 }">
      <a-upload
        :file-list="fileList1"
        list-type="picture"
        accept=".pdf"
        :before-upload="handleBeforeUpload1"
        :on-remove="handleRemove1"
      >
        <a-button size="large" v-if="fileList1.length < 1">
          <upload-outlined />
          选择开题报告
        </a-button>
      </a-upload>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 14, span: 24 }">
      <a-upload
        :file-list="fileList2"
        list-type="picture"
        accept=".pdf"
        :before-upload="handleBeforeUpload2"
        :on-remove="handleRemove2"
      >
        <a-button size="large" v-if="fileList2.length < 1">
          <upload-outlined />
          选择外文翻译
        </a-button>
      </a-upload>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 14, span: 14 }">
      <a-button size="large" type="primary" @click="handleSubmit"
        >提交
      </a-button>
    </a-form-item>
  </a-form>
</template>
