<script setup>
</script>
<template>
  <el-card>
    <el-form :model="data" label-position="top" ref="form1" v-loading="loading">
      <el-form-item label="Username" required prop="username">
        <el-input v-model="data.username" />
      </el-form-item>
      <el-form-item
        label="Email"
        required
        prop="email"
        :rules="[{ type: 'email' }]"
      >
        <el-input v-model="data.email" />
      </el-form-item>

      <el-form-item label="First name" required prop="first_name">
        <el-input v-model="data.first_name" />
      </el-form-item>

      <el-form-item label="Last name" prop="last_name">
        <el-input v-model="data.last_name" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-check" @click="submit">Submit</el-button>
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
  async created() {
    let { data } = await vx.get("/User/setting/general");
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



