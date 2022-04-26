<template>
  <div>
    <template v-if="ready">
      <router-view></router-view>
    </template>
    <template v-else> loading... </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ready: false,
      logined: false,
      version: "v1",
    };
  },
  async beforeCreate() {
    let resp;
    if (process.env.NODE_ENV == "development") {
      resp = {
        endpoint: "http://localhost:8001/api/",
      };
    } else {
      let base = document.querySelector("base").href;
      resp = {
        endpoint: base + "api/",
      };
    }

    try {
      await this.$vx.init(resp);
    } catch (e) {
      this.$alert(e.response.statusText, { type: "error" });
      return;
    }

    this.$vx.loadCSS();
    document.title = this.$vx.config.company ?? "vx";

    this.logined = this.$vx.logined;

    //load js
    await this.$vx.loadJS();

    this.ready = true;
    this.$vx.setRouter(this.$router);

    if (this.logined) {
      if (this.$route.path == "/") {
        this.$router.push(this.$vx.me.default_page);
        return;
      }
    }
  },
  methods: {
    async logout() {
      await this.$vx.logout();
      this.logined = false;
    },
  },
};
</script>
