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
    await this.$vx.init(await resp.json());

    this.logined = this.$vx.logined;
    this.ready = true;
    this.$vx.setRouter(this.$router);

    if (this.logined) {
      if (this.$route.path == "/") {
        this.$router.push("/Dashboard");
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
