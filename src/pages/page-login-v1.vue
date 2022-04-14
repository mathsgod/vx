<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">
      <!-- Login v1 -->
      <div class="card mb-0">
        <div class="card-body">
          <a
            :href="$vx.config['company-url']"
            class="brand-logo"
            target="_blank"
          >
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

            <el-form-item label="Code" required prop="code" v-if="need_code">
              <el-input v-model="form.code"></el-input>
            </el-form-item>
          </el-form>

          <div class="form-group">
            <div class="d-flex justify-content-between">
              <router-link to="/forgot_password">
                <small>Forgot Password?</small>
              </router-link>
            </div>
          </div>

          <div class="form-group" v-if="allow_remember_me">
            <div class="custom-control custom-checkbox">
              <input
                class="custom-control-input"
                type="checkbox"
                id="remember-me"
                tabindex="3"
                v-model="remember_me"
              />
              <label class="custom-control-label" for="remember-me">
                Remember Me
              </label>
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
              <button class="btn btn-primary btn-block" @click.prevent="bio()">
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
      bio_login: false,
      need_code: false,
      allow_remember_me: false,
    };
  },
  created() {
    this.allow_remember_me = this.$vx.config.allow_remember_me;
    this.company = this.$vx.config.company;
    this.version = this.$vx.version;
    if (this.remember_me) {
      if (localStorage.getItem("username")) {
        this.form.username = localStorage.getItem("username");
      }
    }
    if (localStorage.getItem("auth_username")) {
      this.bio_login = true;
    } else {
      this.bio_login = false;
    }
  },
  methods: {
    async bio() {
      try {
        await this.$vx.authLogin(localStorage.getItem("auth_username"));
        this.$router.go();
      } catch (e) {
        console.log(e);
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

            this.$alert(e, { type: "error" });
          }
        }
      });
    },
  },
};
</script>
