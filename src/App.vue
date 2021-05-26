<template>
  <div>
    <template v-if="ready">
      <vx-login v-if="!logined"></vx-login>
      <vx-app v-else v-on:logout="logout"></vx-app>
    </template>
    <template v-else> loading... </template>
  </div>
</template>

<script>
import VxLogin from "./components/vx-login";
import VxApp from "./components/vx-app";
export default {
  components: {
    "vx-login": VxLogin,
    "vx-app": VxApp,
  },
  data() {
    return {
      ready: false,
      logined: false,
    };
  },
  async created() {
    let resp = await fetch("config.json");
    await this.$vx.init(await resp.json());

    this.ready = true;
    this.logined = this.$vx.logined;
  },
  mounted() {},
  methods: {
    logout() {
      this.logined = false;
    },
  },
};
</script>
