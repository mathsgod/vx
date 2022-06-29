<script setup>
import { ref } from 'vue';
import { getMe, $axios } from "@";
import { ElMessage } from 'element-plus';
const me = ref(await getMe());

const form = ref();

const submit = () => {
  form.value.validate(async valid => {
    if (valid) {
      console.log({
        phone: me.value.phone,
        addr1: me.value.addr1,
        addr2: me.value.addr2,
        addr3: me.value.addr3

      });
      let { status } = await $axios.patch("/User/" + me.value.user_id);

      if (status == 204) {
        ElMessage.success("Successfully updated");
      } else {
        ElMessage.error("Failed to update");
      }

    }
  })

}


</script>
<template>
  <el-card header="Information">
    <el-form :model="me" label-position="top" v-loading="loading" ref="form">
      <el-form-item label="Phone" prop="phone">
        <el-input v-model="me.phone" />
      </el-form-item>

      <el-form-item label="Address 1" prop="addr1">
        <el-input v-model="me.addr1" />
      </el-form-item>
      <el-form-item label="Address 2" prop="addr2">
        <el-input v-model="me.addr2" />
      </el-form-item>
      <el-form-item label="Address 3" prop="addr3">
        <el-input v-model="me.addr3" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-check" @click="submit">Submit</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>