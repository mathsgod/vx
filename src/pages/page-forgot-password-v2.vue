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
        <div
          class="w-100 d-lg-flex align-items-center justify-content-center px-5"
        >
          <img
            class="img-fluid"
            src="/images/pages/forgot-password-v2.svg"
            alt="Forgot password V2"
          />
        </div>
      </div>
      <!-- /Left Text-->
      <!-- Forgot password-->
      <div class="d-flex col-lg-4 align-items-center auth-bg px-2 p-lg-5">
        <div class="col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto">
          <h4 class="card-title mb-1">Forgot Password? 🔒</h4>
          <p class="card-text mb-2">
            Enter your username and email and we'll send you instructions to
            reset your password
          </p>
          <el-form
            :model="form"
            ref="form1"
            class="auth-forgot-password-form mt-2 small-label"
          >
            <el-form-item label="Username" required prop="username">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="Email" required prop="email">
              <el-input
                v-model="form.email"
                type="email"
                placeholder="john@example.com"
              ></el-input>
            </el-form-item>

            <button class="btn btn-primary btn-block" @click.prevent="submit">
              Send reset link
            </button>
          </el-form>
          <p class="text-center mt-2">
            <router-link to="/">
              <vx-icon name="chevron-left"></vx-icon> Back to login</router-link
            >
          </p>
        </div>
      </div>
      <!-- /Forgot password-->
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
          let resp = await this.$vx.forgotPassword(
            this.form.username,
            this.form.email
          );

          if (resp.status == 200) {
            await this.$alert(
              "A instrucation are sent your email if your username and email are correct.",
              { type: "success" }
            );
            this.$router.push("/");
          } else {
            this.$alert("server error", { type: "error" });
          }

          this.form = {};
        }
      });
    },
  },
};
</script>
