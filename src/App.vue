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
    let resp = await fetch("config.json");
    try {
      await this.$vx.init(await resp.json());
      this.$vx.loadCSS();
      await this.$vx.loadJS();
    } catch (e) {
      this.$alert(e.response.statusText, { type: "error" });
      return;
    }

    document.title = this.$vx.config.company ?? "vx";

    this.logined = this.$vx.logined;
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
    logout() {
      this.logined = false;
    },
  },
};
</script>
