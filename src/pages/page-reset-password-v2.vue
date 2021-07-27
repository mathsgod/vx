<template>
  <div class="auth-wrapper auth-v2">
    <div class="auth-inner row m-0">
      <!-- Brand logo--><a
        class="brand-logo"
        :href="$vx.config['company-url']"
        target="_blank"
      >
        <el-image
          v-if="$vx.config['company-logo']"
          :src="$vx.config['company-logo']"
          style="height: 40px"
          fit="contain"
        ></el-image>
        <h2 class="brand-text text-primary ml-1">{{ company }}</h2>
      </a>
      <!-- /Brand logo-->
      <!-- Left Text-->
      <div class="d-none d-lg-flex col-lg-8 align-items-center p-5">
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <img
            src="/images/pages/reset-password-v2.svg"
            img-fluid="img-fluid"
            alt="Register V2"
          />
        </div>
      </div>
      <!-- /Left Text-->
      <!-- Reset password-->
      <div class="d-flex col-lg-4 align-items-center auth-bg px-2 p-lg-5">
        <div class="col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto">
          <h4 class="card-title mb-1">Reset Password 🔒</h4>
          <p class="card-text mb-2">
            Your new password must be different from previously used passwords
          </p>

          <el-form
            ref="form1"
            :model="form"
            class="auth-reset-password-form mt-2 small-label"
          >
            <el-form-item label="New Password" prop="pssword">
              <el-input
                type="password"
                v-model="form.password"
                required
                show-password
              ></el-input>
            </el-form-item>

            <el-form-item label="Confirm Password" prop="pssword">
              <el-input
                type="password"
                v-model="form.confirm_password"
                required
                show-password
              ></el-input>
            </el-form-item>

            <el-button type="primary" class="w-100" @click="submit"
              >Set New Password</el-button
            >
          </el-form>
          <p class="text-center mt-2">
            <router-link to="/">
              <vx-icon name="chevron-left"></vx-icon> Back to login
            </router-link>
          </p>
        </div>
      </div>
      <!-- /Reset password-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      company: null,
      form: {},
    };
  },
  created() {
    this.company = this.$vx.config.company;
  },
  methods: {
    submit() {
      this.$refs.form1.validate(async (valid) => {
        if (valid) {
          if (this.form.password != this.form.confirm_password) {
            this.$alert("Confirm password incorrect", { type: "error" });
            return;
          }

          let { data } = await this.$vx.resetPassword(
            this.form.password,
            this.$route.query.token
          );
          if (data.error) {
            this.$alert(data.error.message, { type: "error" });
            return;
          }
          this.$alert("Password updated");
        }
      });
    },
  },
};
</script>
