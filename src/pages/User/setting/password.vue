<template>
  <el-card>
    <el-form :model="form" ref="form" label-position="top">
      <el-form-item :label="$t('New Password')" required prop="new_password">
        <el-input show-password type="password" v-model="form.new_password"></el-input>
      </el-form-item>
      <el-form-item label="Retype New Password" required prop="retype_password">
        <el-input show-password type="password" v-model="form.retype_password"></el-input>
      </el-form-item>

      <div>
        <el-button type="primary" class="mt-1 mr-1" @click="save()" v-text="$t('Save changes')"></el-button>
      </div>
    </el-form>
  </el-card>
</template>
<script >
export default {
  data() {
    return {
      form: {
        new_password: "",
        retype_password: "",
      },
    };
  },
  methods: {
    save() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let { status } = await this.vx.post('/User/setting/password', this.form);
          if (status == 200) {
            this.$message.success("Successfully updated");
          }
        }
      });
    },
  },
};
</script>


            
