<template>
  <div class="auth-wrapper auth-v2">
    <div class="auth-inner row m-0">
      <!-- Brand logo--><a
        class="brand-logo"
        :href="$vx.config['company-url']"
        target="_blank"
      >
        <el-image
          v-if="company_logo"
          :src="company_logo"
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
            src="/images/pages/login-v2.svg"
            alt="Login V2"
          />
        </div>
      </div>
      <!-- /Left Text-->
      <!-- Login-->
      <div class="d-flex col-lg-4 align-items-center auth-bg px-2 p-lg-5">
        <div class="col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto">
          <h4 class="card-title mb-1">Welcome to {{ company }}! 👋</h4>
          <p class="card-text mb-2">
            Please sign-in to your account and start the adventure
          </p>
          <el-form
            class="auth-login-form mt-2 small-label"
            :model="form"
            ref="form1"
          >
            <el-form-item label="Username" required prop="username">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="Password" required prop="password">
              <el-input
                v-model="form.password"
                type="password"
                show-password
              ></el-input>
            </el-form-item>

            <el-form-item label="Code" required prop="code" v-if="need_code">
              <el-input v-model="form.code"></el-input>
            </el-form-item>

            <div class="form-group">
              <div class="d-flex justify-content-between">
                <router-link to="/forgot_password"
                  ><small>Forgot Password?</small></router-link
                >
              </div>
            </div>

            <div class="form-group">
              <div class="custom-control custom-checkbox">
                <input
                  class="custom-control-input"
                  id="remember-me"
                  type="checkbox"
                  tabindex="3"
                  v-model="remember_me"
                />
                <label class="custom-control-label" for="remember-me">
                  Remember Me</label
                >
              </div>
            </div>

            <el-row :gutter="10" class="mb-50" v-if="bio_login">
              <el-col :span="18">
                <button
                  class="btn btn-primary btn-block"
                  @click.prevent="submit()"
                >
                  Sign in
                </button>
              </el-col>
              <el-col :span="6">
                <button
                  class="btn btn-primary btn-block"
                  @click.prevent="bio()"
                >
                  <i class="fas fa-fingerprint"></i>
                </button>
              </el-col>
            </el-row>
            <button
              class="btn btn-primary btn-block mb-50"
              @click.prevent="submit()"
              v-else
            >
              Sign in
            </button>
          </el-form>
        </div>
      </div>
      <!-- /Login-->
    </div>
  </div>
</template>
<script>
export default {
  name: "page-login-v2",
  data() {
    return {
      form: {},
      company: null,
      company_logo: null,
      remember_me: false,
      need_code: false,
    };
  },
  created() {
    this.company = this.$vx.config.company;
    this.company_logo = this.$vx.config["company-logo"];
    this.remember_me = localStorage.remember_me ? true : false;
    if (this.remember_me) {
      if (localStorage.username) {
        this.form.username = localStorage.username;
      }
    }
    if (localStorage.getItem("auth_username")) {
      this.bio_login = true;
    } else {
      this.bio_login = false;
    }
  },
  mounted() {
    if (window.feather) {
      window.feather.replace({ width: 14, height: 14 });
    }
  },
  methods: {
    async bio() {
      try {
        await this.$vx.authLogin(localStorage.getItem("auth_username"));
        this.$router.go();
      } catch (e) {
        this.$alert(e, { type: "error" });
      }
    },
    submit() {
      this.$refs.form1.validate(async (valid) => {
        if (valid) {
          try {
            await this.$vx.login(
              this.form.username,
              this.form.password,
              this.form.code
            );
            this.$vx.cancelViewAs();
            if (this.remember_me) {
              localStorage.setItem("remember_me", true);
              localStorage.setItem("username", this.form.username);
            } else {
              localStorage.removeItem("remember_me");
              localStorage.removeItem("username");
            }
            this.$router.go();
          } catch (e) {
            if (e == "code required") {
              this.need_code = true;
              return;
            }

            console.log(e);
            this.$alert(e, { type: "error" });
          }
        }
      });
    },
  },
};
</script>
