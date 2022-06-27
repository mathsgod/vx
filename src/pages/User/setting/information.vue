<template>
  <el-card>
    <el-form :model="data" label-position="top" ref="form1" v-loading="loading">
      <el-form-item label="Phone" prop="phone">
        <el-input v-model="data.phone" />
      </el-form-item>

      <el-form-item label="Address 1" prop="addr1">
        <el-input v-model="data.addr1" />
      </el-form-item>
      <el-form-item label="Address 2" prop="addr2">
        <el-input v-model="data.addr2" />
      </el-form-item>
      <el-form-item label="Address 3" prop="addr3">
        <el-input v-model="data.addr3" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-check" @click="submit"
          >Submit</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      data: {},
      loading: true,
    };
  },
  async mounted() {
    let { data } = await vx.get("/User/setting/information");
    this.data = data;
    this.loading = false;
  },
  methods: {
    submit() {
      this.$refs.form1.validate(async (valid) => {
        if (valid) {
          let { status } = await vx.patch(
            `/User/${this.data.user_id}`,
            this.data
          );

          console.log(status);

          if (status == 204) {
            this.$message.success("Successfully updated");
          }
        }
      });
    },
  },
};
</script>
