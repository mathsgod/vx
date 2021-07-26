<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">
      <!-- Login v1 -->
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

          <h4 class="card-title mb-1">Welcome to {{ company }}! 👋</h4>
          <p class="card-text mb-2">
            Please sign-in to your account and start the adventure
          </p>

          <el-form :model="form" ref="form1" class="small-label">
            <el-form-item label="Username" required prop="username">
              <el-input v-model="form.username" autofocus></el-input>
            </el-form-item>

            <el-form-item label="Password" required prop="password">
              <el-input
                v-model="form.password"
                type="password"
                show-password
                @keyup.enter.native="submit()"
              >
                ></el-input
              >
            </el-form-item>
          </el-form>

          <div class="form-group">
            <div class="d-flex justify-content-between">
              <router-link to="/forgot_password">
                <small>Forgot Password?</small>
              </router-link>
            </div>
          </div>

          <div class="form-group">
            <div class="custom-control custom-checkbox">
              <input
                class="custom-control-input"
                type="checkbox"
                id="remember-me"
                tabindex="3"
                v-model="remember_me"
              />
              <label class="custom-control-label" for="remember-me"> Remember Me </label>
            </div>
          </div>
          <button
            class="btn btn-primary btn-block mb-50"
            tabindex="4"
            @click.prevent="submit()"
          >
            Sign in
          </button>

          <div class="d-flex flex-column align-items-end">
            <el-link @click="show_version = !show_version">version</el-link>

            <div v-if="show_version">
              <el-table :data="version" :show-header="false" size="mini">
                <el-table-column prop="name"></el-table-column>
                <el-table-column prop="value"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
      <!-- /Login v1 -->
    </div>
  </div>
</template>

<script>
import "../assets/css/pages/page-auth.css";
export default {
  data() {
    return {
      form: {},
      company: null,
      remember_me: false,
      version: {},
      show_version: false,
    };
  },
  created() {
    this.company = this.$vx.config.company;
    this.version = this.$vx.version;
  },
  methods: {
    submit() {
      this.$refs.form1.validate(async (valid) => {
        if (valid) {
          try {
            await this.$vx.login(this.form.username, this.form.password);
            this.$vx.cancelViewAs();
            if (this.form.remember_me) {
              localStorage.setItem("vx_remember_me", true);
              localStorage.setItem("vx_username", this.form.username);
            }
            this.$router.go();
          } catch (e) {
            this.$alert(e, { type: "error" });
          }
        }
      });
    },
  },
};
</script>
