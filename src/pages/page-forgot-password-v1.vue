<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">
      <!-- Forgot Password v1 -->
      <div class="card mb-0">
        <div class="card-body">
          <a :href="$vx.config['company-url']" class="brand-logo" target="_blank">
            <el-image
              v-if="$vx.config['company-logo']"
              :src="$vx.config['company-logo']"
              style="height: 40px"
              fit="contain"
            ></el-image>
            <h2 v-else class="brand-text text-primary ml-1">{{ company }}</h2>
          </a>

          <h4 class="card-title mb-1">Forgot Password? 🔒</h4>
          <p class="card-text mb-2">
            Enter your username and email and we'll send you instructions to reset your
            password
          </p>

          <el-form
            ref="form1"
            :model="form"
            class="auth-forgot-password-form mt-2 small-label"
            action="page-auth-reset-password-v1.html"
            method="POST"
          >
            <el-form-item label="Username" required prop="username">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item
              label="Email"
              required
              prop="email"
              :rules="[{ type: 'email' }]"
            >
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
              <vx-icon name="chevron-left"></vx-icon> Back to login
            </router-link>
          </p>
        </div>
      </div>
      <!-- /Forgot Password v1 -->
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
    async submit() {
      this.$refs.form1.validate(async (valid) => {
        if (valid) {
          let resp = await this.$vx.forgotPassword(this.form.username, this.form.email);

          if (resp.status == 200) {
            this.$alert(
              "A instrucation are sent your email if your username and email are correct.",
              { type: "success" }
            );
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
